import type { NextApiRequest, NextApiResponse } from "next";
import STATUS_CODES from "@constants/errors/statusCode";
import { getAllContributes } from "../../server/usecase/contribute";
import ContributeEntity from "@server/domain/entity/contribute";

type ResponseData = {
  contributes: ContributeEntity[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  /**
   * TODO
   * 各apiごとにreq.methodを書くのは保守性が悪いので共通化する
   */
  try {
    if (req.method === "GET") {
      const contributes = await getAllContributes();
      res.status(STATUS_CODES.OK).json({ contributes });
    }
  } catch (e) {
    console.error(e.stack);
    res.status(e.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).end();
  }
}
