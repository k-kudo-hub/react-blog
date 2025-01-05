import { destroy, get, post, put } from "@utils/server";
import { Contribute } from "../models/contribute";

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

  async getContribute(identityCode: string): Promise<Contribute> {
    const response = await get(`/contribute/${identityCode}`);
    return response?.data;
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

  async deleteContribute(identityCode: string): Promise<void> {
    const response = await destroy(`/contribute`, { identityCode });
    return response?.data;
  }
}
