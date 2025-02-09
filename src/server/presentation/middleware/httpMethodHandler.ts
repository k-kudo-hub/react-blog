import CustomError from "@server/domain/entity/error";
import { StatusCodes, Codes } from "@constants/http";
import { getToken } from "next-auth/jwt";
import UserRepository from "@server/infrastructure/repository/user";
import TransactionManager from "@server/infrastructure/repository/prisma/transaction";
import UserEntity from "@server/domain/entity/user";
import { type NextRequest } from "next/server";

type TTruthyPrimitive = string | number | boolean;

export interface INextApiRequestWithUser extends NextRequest {
  /**
   * リクエストを送信したユーザー
   * ユーザーがログインしていない場合はundefined
   * ex: { id: "xxxx", name: "name", email: "email" }
   */
  user?: UserEntity;

  /**
   * requestのbody
   * "body"を使用したかったが、NextRequestにbodyが存在しているため、dataに変更
   * ex: { contribute: { identityCode: "xxxx", title: "title", content: "content" } }
   */
  data?: any;

  /**
   * リクエストのURLのパラメータ
   * ex: /api/contribute?status=public -> { status: "public" }
   */
  params?: { [key: string]: TTruthyPrimitive };
}

type TParameters = {
  params: Promise<any>;
};

type TOutputMethods = {
  GET?: (request: INextApiRequestWithUser, params: TParameters) => Promise<any>;
  POST?: (request: INextApiRequestWithUser) => Promise<any>;
  PUT?: (request: INextApiRequestWithUser) => Promise<any>;
  DELETE?: (request: INextApiRequestWithUser) => Promise<any>;
};

export interface ResponseData {
  data: any;
  error: any;
}

export class HttpMethodHandler {
  GET?: (request: INextApiRequestWithUser, params: TParameters) => Promise<any>;
  POST?: (request: INextApiRequestWithUser) => Promise<any>;
  PUT?: (request: INextApiRequestWithUser) => Promise<any>;
  DELETE?: (request: INextApiRequestWithUser) => Promise<any>;

  constructor(params: TOutputMethods) {
    this.GET = params.GET;
    this.POST = params.POST;
    this.PUT = params.PUT;
    this.DELETE = params.DELETE;
  }

  export(): TOutputMethods {
    const outputMethods: TOutputMethods = {};
    if (typeof this.GET === "function") {
      outputMethods.GET = async (
        request: INextApiRequestWithUser,
        params?: TParameters,
      ) => {
        return await this.handle({
          request,
          method: this.GET as (
            request: INextApiRequestWithUser,
            params?: TParameters,
          ) => Promise<any>,
          params,
        });
      };
    }
    if (typeof this.POST === "function") {
      outputMethods.POST = async (request: INextApiRequestWithUser) => {
        return await this.handle({
          request,
          method: this.POST as (
            request: INextApiRequestWithUser,
          ) => Promise<any>,
        });
      };
    }
    if (typeof this.PUT === "function") {
      outputMethods.PUT = async (request: INextApiRequestWithUser) => {
        return await this.handle({
          request,
          method: this.PUT as (
            request: INextApiRequestWithUser,
          ) => Promise<any>,
        });
      };
    }
    if (typeof this.DELETE === "function") {
      outputMethods.DELETE = async (request: INextApiRequestWithUser) => {
        return await this.handle({
          request,
          method: this.DELETE as (
            request: INextApiRequestWithUser,
          ) => Promise<any>,
        });
      };
    }
    return outputMethods;
  }

  private async handle({
    request,
    method,
    params,
  }: {
    request: INextApiRequestWithUser;
    method: (
      request: INextApiRequestWithUser,
      params?: TParameters,
    ) => Promise<any>;
    params?: TParameters;
  }) {
    const responseData: ResponseData = {
      data: undefined,
      error: undefined,
    };
    try {
      await this.injectUserToRequest(request);
      await this.injectBodyToRequest(request);
      this.injectRawParamsToRequest(request, params);
      responseData.data = await method(request);
      return Response.json(responseData);
    } catch (e) {
      console.error(e);
      if (e instanceof CustomError) {
        responseData.error = {
          statusCode: e.statusCode,
          code: e.code,
          message: e.message,
        };
      } else {
        responseData.error = {
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          code: Codes.INTERNAL_SERVER_ERROR,
          message: "Internal Server Error",
        };
      }
      return new Response(responseData.error.message, {
        status: responseData.error.statusCode,
        statusText: responseData.error.code,
      });
    }
  }

  private async injectUserToRequest(req: INextApiRequestWithUser) {
    const userToken = await getToken({ req });

    if (!userToken?.sub) {
      return (req.user = undefined);
    }

    const tM = new TransactionManager();
    const user = await tM.execute(async (tx) => {
      const userRepository = new UserRepository(tx);
      return userRepository.getById(userToken.sub as string);
    });

    return (req.user = user);
  }

  /**
   * request.nextUrl.searchParams.get('status')みたいにするのが面倒くさすぎるので、ここで全てのパラメータをreq.paramsに入れる
   * TODO: 本当にこれ以外のやり方がないのか検証したい。全ての開発者にこの作業を強いているのか...??
   */
  private injectRawParamsToRequest(
    req: INextApiRequestWithUser,
    params?: TParameters,
  ) {
    const searchParams = req.nextUrl.searchParams;
    const rawParams: { [key: string]: TTruthyPrimitive } = {};
    searchParams.forEach((value, key) => {
      rawParams[key] = value;
    });
    const _params = params?.params || {};
    return (req.params = { ...rawParams, ..._params });
  }

  private async injectBodyToRequest(req: INextApiRequestWithUser) {
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return (req.data = undefined);
    }
    return (req.data = body);
  }
}
