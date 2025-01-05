import type { NextApiResponse } from "next";
import {
  HttpMethodHandler,
  INextRequestWithUser,
  ResponseData,
} from "@server/presentation/middleware/httpMethodHandler";
import { createContribute } from "@server/usecase/createContribute";
import CustomError from "@server/domain/entity/error";
import { Codes, StatusCodes } from "@constants/http";
import { updateContribute } from "@server/usecase/updateContribute";
import { deleteContribute } from "@server/usecase/deleteContribute";

interface IContributePostParams extends INextRequestWithUser {
  body: ReadableStream<Uint8Array> & {
    contribute: {
      identityCode: string;
      title: string;
      content: string;
    };
  };
}

interface IContributeDeleteParams extends INextRequestWithUser {
  body: ReadableStream<Uint8Array> & {
    identityCode: string;
  };
}

export default async function handler(
  req: INextRequestWithUser,
  res: NextApiResponse<ResponseData>,
) {
  const methodHandler = new HttpMethodHandler({
    post: async () => {
      const request = req as IContributePostParams;

      if (!req.user) {
        throw new CustomError({
          statusCode: StatusCodes.UNAUTHORIZED,
          message: "新規投稿するためには、ログインをしてください。",
          code: Codes.UNAUTHORIZED,
        });
      }

      const contributeParam = {
        ...request.body?.contribute,
        userId: req.user.id,
        user: req.user,
      };

      const contribute = await createContribute({
        contribute: contributeParam,
      });

      return {
        identityCode: contribute.identityCode,
        title: contribute.title,
        content: contribute.content,
      };
    },
    put: async () => {
      const request = req as IContributePostParams;
      if (!request.user) {
        throw new CustomError({
          statusCode: StatusCodes.UNAUTHORIZED,
          message: "新規投稿するためには、ログインをしてください。",
          code: Codes.UNAUTHORIZED,
        });
      }

      const contribute = request.body?.contribute;
      if (!contribute?.identityCode) {
        throw new CustomError({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: "投稿IDを指定してください。",
          code: Codes.INTERNAL_SERVER_ERROR,
        });
      }

      return await updateContribute(contribute);
    },
    delete: async () => {
      const request = req as IContributeDeleteParams;
      if (!request.user) {
        throw new CustomError({
          statusCode: StatusCodes.UNAUTHORIZED,
          message: "投稿を削除するためには、ログインをしてください。",
          code: Codes.UNAUTHORIZED,
        });
      }

      const identityCode = request.body?.identityCode;
      if (!identityCode) {
        throw new CustomError({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: "投稿IDを指定してください。",
          code: Codes.INTERNAL_SERVER_ERROR,
        });
      }

      return await deleteContribute(identityCode);
    },
  });

  await methodHandler.execute(req, res);
}
