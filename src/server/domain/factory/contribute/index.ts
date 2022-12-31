import dayjs from "dayjs";
import ContributeEntity from "@server/domain/entity/contribute";
import {
  ContributeType,
  ContributeDataType,
  ContributeTagRelationDataType,
} from "@server/domain/entity/contribute/types";
import { BaseFactory } from "../base";

export class ContributeFactory extends BaseFactory {
  create(params: ContributeType): ContributeEntity {
    return this.createEntity(ContributeEntity, params);
  }
  reconstruct(params: ContributeType): ContributeEntity {
    return this.createEntity(ContributeEntity, params);
  }
  reconstructList(params: ContributeDataType[]): ContributeEntity[] {
    const seed = params.map((param) => {
      const tags =
        param.tags?.map(
          (tagRelation: ContributeTagRelationDataType) => tagRelation.tag
        ) || [];
      const publishedAt = param.publishedAt
        ? dayjs(param.publishedAt).format("YYYY年MM月DD日")
        : null;
      const lastEditedAt = param.lastEditedAt
        ? dayjs(param.lastEditedAt).format("YYYY年MM月DD日")
        : null;
      return {
        ...param,
        publishedAt,
        lastEditedAt,
        tags,
      };
    });
    return this.createEntityArray(ContributeEntity, seed);
  }
}
