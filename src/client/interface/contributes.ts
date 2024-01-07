import { get, post } from "@utils/server";
import { Contribute as ContributeType } from "../models/contribute";

interface CreateContributeParam {
  identityCode: string;
  title: string;
  content: string;
}

export class ContributeInterface {
  async getAllContributes(): Promise<ContributeType[]> {
    const response = await get("/contributes");
    return response?.data || [];
  }

  async getContribute(identityCode: string): Promise<ContributeType> {
    const response = await get(`/contribute/${identityCode}`);
    return response?.data;
  }

  async createContribute(
    contribute: CreateContributeParam,
  ): Promise<ContributeType> {
    const response = await post(`/contribute`, { contribute });
    return response?.data;
  }
}
