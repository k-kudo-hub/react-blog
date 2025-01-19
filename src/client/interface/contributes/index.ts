import { destroy, get, post, put } from "@utils/server";
import { Contribute } from "../../models/contribute";
import {
  createContributeFromResponse,
  createContributeListFromResponse,
} from "./factory";
import { CONTRIBUTE_STATUS } from "@server/domain/entity/contribute";

interface CreateContributeParam {
  identityCode: string;
  title: string;
  content: string;
}

export class ContributeInterface {
  async getRecentContributes(): Promise<Contribute[]> {
    const response = await get("/contributes", {
      status: CONTRIBUTE_STATUS.PUBLISHED,
    });

    if (!response?.data) {
      return [];
    }

    return createContributeListFromResponse(response.data);
  }

  async getMyContributes(userId: string): Promise<Contribute[]> {
    const response = await get("/contributes", {
      userId,
    });

    if (!response?.data) {
      return [];
    }

    return createContributeListFromResponse(response.data);
  }

  async getContribute(identityCode: string): Promise<Contribute | undefined> {
    const response = await get(`/contribute/${identityCode}`);

    if (!response?.data) {
      return undefined;
    }

    return createContributeFromResponse(response.data);
  }

  async createContribute(
    contribute: CreateContributeParam,
  ): Promise<Contribute | undefined> {
    const response = await post(`/contribute`, { contribute });

    if (!response?.data) {
      return undefined;
    }

    return createContributeFromResponse(response.data);
  }

  async updateContribute(
    contribute: CreateContributeParam,
  ): Promise<Contribute | undefined> {
    const response = await put(`/contribute`, { contribute });

    if (!response?.data) {
      return undefined;
    }

    return createContributeFromResponse(response.data);
  }

  async updateContributeStatus(
    contribute: Contribute,
  ): Promise<Contribute | undefined> {
    const response = await put(`/contribute/status`, { contribute });

    if (!response?.data) {
      return undefined;
    }

    return createContributeFromResponse(response.data);
  }

  async deleteContribute(
    identityCode: string,
  ): Promise<Contribute | undefined> {
    const response = await destroy(`/contribute`, { identityCode });

    if (!response?.data) {
      return undefined;
    }

    return createContributeFromResponse(response.data);
  }
}
