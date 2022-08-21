import type { NextApiRequest, NextApiResponse } from "next";
import { getAllContributes } from "../../server/usecase/contribute";

interface contribute {
  id: number;
  title: string;
  tags: string[];
}

type ResponseData = {
  contributes: contribute[];
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
