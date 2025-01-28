import "reflect-metadata";
import {
  HttpMethodHandler,
  INextApiRequestWithUser,
} from "@server/presentation/middleware/httpMethodHandler";
import { createContribute } from "@server/usecase/createContribute";
import CustomError from "@server/domain/entity/error";
import { Codes, StatusCodes } from "@constants/http";
import { updateContribute } from "@server/usecase/updateContribute";
import { deleteContribute } from "@server/usecase/deleteContribute";
import ContributeEntity from "@server/domain/entity/contribute";

type IContributePostBody = {
  contribute: {
    identityCode: string;
    title: string;
    content: string;
  };
};

type IContributeDeleteBody = {
  identityCode: string;
};

const methodHandler = new HttpMethodHandler({
  POST: async (request: INextApiRequestWithUser): Promise<ContributeEntity> => {
    if (!request.user) {
      throw new CustomError({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "新規投稿するためには、ログインをしてください。",
        code: Codes.UNAUTHORIZED,
      });
    }

    const body = request.data as IContributePostBody;
    const contributeParam = {
      ...body?.contribute,
      userId: request.user.id,
      user: request.user,
    };

    if (!contributeParam.title) {
      throw new CustomError({
        statusCode: StatusCodes.BAD_REQUEST,
        message: "タイトルを指定してください。",
        code: Codes.BAD_REQUEST,
      });
    }

    if (!contributeParam.content) {
      throw new CustomError({
        statusCode: StatusCodes.BAD_REQUEST,
        message: "本文を入力してください。",
        code: Codes.BAD_REQUEST,
      });
    }

    const contribute = await createContribute({
      contribute: contributeParam,
    });

    return contribute;
  },
  PUT: async (request: INextApiRequestWithUser) => {
    if (!request.user) {
      throw new CustomError({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "新規投稿するためには、ログインをしてください。",
        code: Codes.UNAUTHORIZED,
      });
    }

    const body = request.data as IContributePostBody;
    const contribute = body.contribute;
    if (!contribute?.identityCode) {
      throw new CustomError({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "投稿IDを指定してください。",
        code: Codes.INTERNAL_SERVER_ERROR,
      });
    }

    return await updateContribute(contribute);
  },
  DELETE: async (request: INextApiRequestWithUser) => {
    if (!request.user) {
      throw new CustomError({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "投稿を削除するためには、ログインをしてください。",
        code: Codes.UNAUTHORIZED,
      });
    }

    const body = request.data as IContributeDeleteBody;
    const identityCode = body?.identityCode;
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

export const { POST, PUT, DELETE } = methodHandler.export();
