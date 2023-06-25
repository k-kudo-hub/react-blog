import dayjs from "dayjs";
import ContributeEntity from "@server/domain/entity/contribute";
import {
  ContributeDataType,
  ContributeTagRelationDataType,
} from "@server/domain/entity/contribute/types";
import { BaseFactory } from "../base";

export class ContributeFactory extends BaseFactory {
  reconstruct(param: ContributeDataType): ContributeEntity {
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
    const title = param.details ? param.details.title : null;
    const content = param.details ? param.details.content : null;
    return this.createEntity(ContributeEntity, {
      ...param,
      publishedAt,
      lastEditedAt,
      tags,
      title,
      content,
    });
  }
  reconstructList(params: ContributeDataType[]): ContributeEntity[] {
    return params.map((param) => this.reconstruct(param));
  }
}
