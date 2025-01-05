import dayjs from "dayjs";
import ContributeEntity from "@server/domain/entity/contribute";
import {
  ContributeDataType,
  ContributeTagRelationDataType,
} from "@server/domain/entity/contribute/types";
import { BaseFactory } from "../base";

const CODE_LENGTH = 20;
const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export class ContributeFactory extends BaseFactory {
  reconstruct(param: ContributeDataType): ContributeEntity {
    const tags =
      param.tags?.map(
        (tagRelation: ContributeTagRelationDataType) => tagRelation.tag,
      ) || [];
    const publishedAt = param.publishedAt
      ? dayjs(param.publishedAt).toDate()
      : null;
    const lastEditedAt = param.lastEditedAt
      ? dayjs(param.lastEditedAt).toDate()
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

  generateIdentityCode(): string {
    let identityCode = "";
    for (let i = 0; i < CODE_LENGTH; i++) {
      const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
      identityCode += CHARACTERS.charAt(randomIndex);
    }
    return identityCode;
  }
}
