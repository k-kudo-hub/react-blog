import "reflect-metadata";
import { getAllContributes } from "@server/usecase/getAllContributes";
import { GetManyContributesParam } from "@server/infrastructure/repository/contribute";
import {
  HttpMethodHandler,
  INextApiRequestWithUser,
} from "@/server/presentation/middleware/httpMethodHandler";

const httpMethodHandler = new HttpMethodHandler({
  GET: async (request: INextApiRequestWithUser) => {
    const params = request.params as GetManyContributesParam;
    const query: GetManyContributesParam = {
      limit: params.limit,
      offset: params.offset,
      status: params.status,
      userId: params.userId,
    };
    return await getAllContributes(query);
  },
});

export const { GET } = httpMethodHandler.export();
