import type { NextApiResponse } from "next";
import {
  HttpMethodHandler,
  INextRequestWithUser,
  ResponseData,
} from "@server/presentation/middleware/httpMethodHandler";
import { createContribute } from "@server/usecase/createContribute";
import CustomError from "@server/domain/entity/error";
import { Codes, StatusCodes } from "@constants/http";

interface IContributePostParams extends INextRequestWithUser {
  body: ReadableStream<Uint8Array> & {
    contribute: {
      identityCode: string;
      title: string;
      content: string;
    };
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
  });

  await methodHandler.execute(req, res);
}
