import type { NextApiRequest, NextApiResponse } from "next";
import { getAllContributes } from "@server/usecase/getAllContributes";
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
      return await getAllContributes();
    },
  });

  await methodHandler.execute(req, res);
}
