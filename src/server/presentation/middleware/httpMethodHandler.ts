import { NextApiRequest, NextApiResponse } from "next";
import CustomError from "@server/domain/entity/error";
import { StatusCodes, Codes } from "@constants/http";
import { getToken } from "next-auth/jwt";
import UserRepository from "@server/infrastructure/repository/user";
import TransactionManager from "@server/infrastructure/repository/prisma/transaction";
import UserEntity from "@server/domain/entity/user";

export interface INextRequestWithUser extends NextApiRequest {
  user?: UserEntity;
}

interface InputMethods {
  get?: () => Promise<any>;
  post?: () => Promise<any>;
  put?: () => Promise<any>;
  delete?: () => Promise<any>;
}

export interface ResponseData {
  data: any;
  error: any;
}

export class HttpMethodHandler {
  get: (() => Promise<any>) | undefined;
  post: (() => Promise<any>) | undefined;
  put: (() => Promise<any>) | undefined;
  delete: (() => Promise<any>) | undefined;

  constructor(params: InputMethods) {
    this.get = params.get;
    this.post = params.post;
    this.put = params.put;
    this.delete = params.delete;
  }

  async execute(req: NextApiRequest, res: NextApiResponse) {
    const response: ResponseData = {
      data: undefined,
      error: undefined,
    };
    try {
      await this.injectUserToRequest(req);
      if (req.method === "GET" && !!this.get) {
        response.data = await this.get();
      } else if (req.method === "POST" && !!this.post) {
        response.data = await this.post();
      } else if (req.method === "PUT" && !!this.put) {
        response.data = await this.put();
      } else if (req.method === "DELETE" && !!this.delete) {
        response.data = await this.delete();
      } else {
        throw new CustomError({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: "指定されたリクエストは無効です。",
          code: Codes.INTERNAL_SERVER_ERROR,
        });
      }
      res.status(StatusCodes.OK).json(response);
    } catch (e) {
      console.error(e);
      if (e instanceof CustomError) {
        response.error = {
          statusCode: e.statusCode,
          code: e.code,
          message: e.message,
        };
      } else {
        response.error = {
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          code: Codes.INTERNAL_SERVER_ERROR,
          message: "予期せぬエラーが発生しました。管理者にお問合せください。",
        };
      }
      res
        .status(
          response.error
            ? response.error.statusCode
            : StatusCodes.INTERNAL_SERVER_ERROR,
        )
        .json(response);
    }
  }

  private async injectUserToRequest(req: INextRequestWithUser) {
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
}
