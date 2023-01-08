import { get } from "@utils/server";
import { Contribute as ContributeType } from "../models/contribute";

export class ContributeInterface {
  async getAllContributes(): Promise<ContributeType[]> {
    const response = await get("/contributes");
    return response?.data || [];
  }

  async getContribute(identityCode: string): Promise<ContributeType> {
    const response = await get(`/contribute/${identityCode}`);
    return response?.data;
  }
}
