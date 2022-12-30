import { NextApiRequest, NextApiResponse } from "next";
import CustomError from "@server/domain/entity/error";
import { StatusCodes, Codes } from "@constants/errors/statusCode";

interface InputMethods {
  get?: (req: NextApiRequest) => Promise<any>;
  post?: (req: NextApiRequest) => Promise<any>;
  put?: (req: NextApiRequest) => Promise<any>;
  delete?: (req: NextApiRequest) => Promise<any>;
}

export interface ResponseData {
  data: any;
  error: any;
}

export class HttpMethodHandler {
  get: ((req: NextApiRequest) => Promise<any>) | undefined;
  post: ((req: NextApiRequest) => Promise<any>) | undefined;
  put: ((req: NextApiRequest) => Promise<any>) | undefined;
  delete: ((req: NextApiRequest) => Promise<any>) | undefined;

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
        response.data = await this.get(req);
      } else if (req.method === "POST" && !!this.post) {
        response.data = await this.post(req);
      } else if (req.method === "PUT" && !!this.put) {
        response.data = await this.put(req);
      } else if (req.method === "DELETE" && !!this.delete) {
        response.data = await this.delete(req);
      } else {
        throw new CustomError({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: "指定されたリクエストは無効です。",
          code: Codes.INTERNAL_SERVER_ERROR,
        });
      }
      res.status(StatusCodes.OK).json(response);
    } catch (e) {
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
