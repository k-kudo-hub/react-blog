import { NextApiRequest, NextApiResponse } from "next";
import CustomError from "@server/domain/entity/error";
import { StatusCodes, Codes } from "@constants/http";
import InternalServerError from "@server/domain/entity/error/InternalServerError";

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
      if (req.method === "GET" && !!this.get) {
        response.data = await this.get();
      } else if (req.method === "POST" && !!this.post) {
        response.data = await this.post();
      } else if (req.method === "PUT" && !!this.put) {
        response.data = await this.put();
      } else if (req.method === "DELETE" && !!this.delete) {
        response.data = await this.delete();
      } else {
        throw new InternalServerError({
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
            : StatusCodes.INTERNAL_SERVER_ERROR
        )
        .json(response);
    }
  }
}
