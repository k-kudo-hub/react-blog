import { BaseFactory } from "../base";
import ContributeEntity from "@server/domain/entity/contribute";
import {
  ContributeType,
  ContributeDataType,
  ContributeTagRelationDataType,
} from "@server/domain/entity/contribute/types";

export class ContributeFactory extends BaseFactory {
  create(params: ContributeType): ContributeEntity {
    return this.createEntity(ContributeEntity, params);
  }
  reconstruct(params: ContributeType): ContributeEntity {
    return this.createEntity(ContributeEntity, params);
  }
  reconstructList(params: ContributeDataType[]): ContributeEntity[] {
    const seed = params.map((p) => {
      const tags =
        p.tags?.map(
          (tagRelation: ContributeTagRelationDataType) => tagRelation.tag
        ) || [];
      return {
        ...p,
        tags,
      };
    });
    return this.createEntityArray(ContributeEntity, seed);
  }
}
