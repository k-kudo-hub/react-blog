import "reflect-metadata";
import {
  HttpMethodHandler,
  INextApiRequestWithUser,
} from "@server/presentation/middleware/httpMethodHandler";
import CustomError from "@server/domain/entity/error";
import { Codes, StatusCodes } from "@constants/http";
import { Contribute } from "src/client/models/contribute";
import { publishContribute } from "@server/usecase/publishContribute";
import { CONTRIBUTE_STATUS_LIST } from "@server/domain/entity/contribute";

type IContributeStatusPutBody = {
  contribute: Contribute;
};

const methodHandler = new HttpMethodHandler({
  PUT: async (request: INextApiRequestWithUser) => {
    if (!request.user) {
      throw new CustomError({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "公開状態を変更するためには、ログインをしてください。",
        code: Codes.UNAUTHORIZED,
      });
    }

    const { contribute } = request.data as IContributeStatusPutBody;
    const { identityCode, status } = contribute;
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

    return await publishContribute({ identityCode, status });
  },
});

export const { PUT } = methodHandler.export();
