import { destroy, get, post, put } from "@utils/server";
import { Contribute } from "../models/contribute";
import dayjs from "dayjs";

interface CreateContributeParam {
  identityCode: string;
  title: string;
  content: string;
}

export class ContributeInterface {
  async getAllContributes(): Promise<Contribute[]> {
    const response = await get("/contributes");
    return response?.data || [];
  }

  async getContribute(identityCode: string): Promise<Contribute | undefined> {
    const response = await get(`/contribute/${identityCode}`);

    if (!response?.data) {
      return undefined;
    }

    // TODO: フロント用のFactoryを作成する
    return {
      ...response.data,
      lastEditedAt: response.data.lastEditedAt
        ? dayjs(response.data.lastEditedAt).format("YYYY年MM月DD日")
        : null,
      publishedAt: response.data.publishedAt
        ? dayjs(response.data.publishedAt).format("YYYY年MM月DD日")
        : null,
    };
  }

  async createContribute(
    contribute: CreateContributeParam,
  ): Promise<Contribute> {
    const response = await post(`/contribute`, { contribute });
    return response?.data;
  }

  async updateContribute(
    contribute: CreateContributeParam,
  ): Promise<Contribute> {
    const response = await put(`/contribute`, { contribute });
    return response?.data;
  }

  async updateContributeStatus(contribute: Contribute): Promise<Contribute> {
    const response = await put(`/contribute/status`, { contribute });
    return response?.data;
  }

  async deleteContribute(identityCode: string): Promise<Contribute> {
    const response = await destroy(`/contribute`, { identityCode });
    return response?.data;
  }
}
