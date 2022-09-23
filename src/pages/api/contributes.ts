import type { NextApiRequest, NextApiResponse } from "next";
import { getAllContributes } from "../../server/usecase/contribute";
import { ContributeFormatted } from "../../server/domain/model/contribute";

type ResponseData = {
  contributes: ContributeFormatted[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const contributes = await getAllContributes();
      res.status(200).json({ contributes });
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  }
}
