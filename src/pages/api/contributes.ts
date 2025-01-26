import "reflect-metadata";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllContributes } from "@server/usecase/getAllContributes";
import {
  HttpMethodHandler,
  INextRequestWithUser,
  ResponseData,
} from "@server/presentation/middleware/httpMethodHandler";
import { GetManyContributesParam } from "@server/infrastructure/repository/contribute";

type IGetManyContributesParam = INextRequestWithUser & {
  query: GetManyContributesParam;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const methodHandler = new HttpMethodHandler({
    get: async () => {
      const request = req as IGetManyContributesParam;
      return getAllContributes(request.query);
    },
  });

  await methodHandler.execute(req, res);
}
