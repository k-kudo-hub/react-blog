import type { NextApiRequest, NextApiResponse } from "next";
import { getContribute } from "@server/usecase/getContribute";
import {
  HttpMethodHandler,
  ResponseData,
} from "@server/presentation/middleware/httpMethodHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const methodHandler = new HttpMethodHandler({
    get: async () => {
      const identityCode = req.query.identityCode as string;
      return await getContribute(identityCode);
    },
  });

  await methodHandler.execute(req, res);
}
