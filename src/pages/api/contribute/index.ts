import type { NextApiRequest, NextApiResponse } from "next";
import {
  HttpMethodHandler,
  ResponseData,
} from "@server/presentation/middleware/httpMethodHandler";
import { createContribute } from "@server/usecase/createContribute";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const methodHandler = new HttpMethodHandler({
    post: async () => {
      return createContribute(req.body.contribute);
    },
  });

  await methodHandler.execute(req, res);
}
