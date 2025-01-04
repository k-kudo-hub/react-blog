import type { NextApiResponse } from "next";
import {
  HttpMethodHandler,
  INextRequestWithUser,
  ResponseData,
} from "@server/presentation/middleware/httpMethodHandler";
import CustomError from "@server/domain/entity/error";
import { Codes, StatusCodes } from "@constants/http";
import { Contribute } from "src/client/models/contribute";
import { updateContributeStatus } from "@server/usecase/updateContributeStatus";
import { CONTRIBUTE_STATUS_LIST } from "@server/domain/entity/contribute";

interface IContributeStatusPutParams extends INextRequestWithUser {
  body: ReadableStream<Uint8Array> & {
    contribute: Contribute;
  };
}

export default async function handler(
  req: INextRequestWithUser,
  res: NextApiResponse<ResponseData>,
) {
  const methodHandler = new HttpMethodHandler({
    put: async () => {
      const request = req as IContributeStatusPutParams;
      if (!request.user) {
        throw new CustomError({
          statusCode: StatusCodes.UNAUTHORIZED,
          message: "公開状態を変更するためには、ログインをしてください。",
          code: Codes.UNAUTHORIZED,
        });
      }

      const { identityCode, status } = request.body.contribute;
      if (!identityCode) {
        throw new CustomError({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: "投稿IDを指定してください。",
          code: Codes.INTERNAL_SERVER_ERROR,
        });
      }

      if (!status) {
        throw new CustomError({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: "公開状態を指定してください。",
          code: Codes.INTERNAL_SERVER_ERROR,
        });
      }

      if (!CONTRIBUTE_STATUS_LIST.includes(status)) {
        throw new CustomError({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: "公開状態の指定が不正です。",
          code: Codes.INTERNAL_SERVER_ERROR,
        });
      }

      return await updateContributeStatus({ identityCode, status });
    },
  });

  await methodHandler.execute(req, res);
}
