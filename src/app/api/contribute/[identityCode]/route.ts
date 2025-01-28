import "reflect-metadata";
import { getContribute } from "@server/usecase/getContribute";
import {
  HttpMethodHandler,
  INextApiRequestWithUser,
} from "@server/presentation/middleware/httpMethodHandler";

type IGetContributeParam = {
  identityCode: string;
};

const methodHandler = new HttpMethodHandler({
  GET: async (request: INextApiRequestWithUser) => {
    const { identityCode } = request.params as IGetContributeParam;
    return await getContribute(identityCode);
  },
});

export const { GET } = methodHandler.export();
