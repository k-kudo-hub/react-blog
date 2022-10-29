import { ContributeTagRelation, Tag } from "@prisma/client";
import BaseEntity from "./base";

export interface ContributeType {
  id: number;
  userId: number;
  title: string;
  tags: Tag[];
  content: string;
  status: string;
  publishedAt: Date | null;
  lastEditedAt: Date | null;
}

export default class ContributeEntity extends BaseEntity {
  private id: number | null = null;
  private userId: number;
  private title: string;
  private tags: Tag[];
  private content: string;
  private status: string;
  private publishedAt: Date | null;
  private lastEditedAt: Date | null;

  constructor({
    id,
    userId,
    title,
    tags,
    content,
    status,
    publishedAt,
    lastEditedAt,
  }: ContributeType) {
    super();
    this.id = id || null;
    this.userId = userId;
    this.title = title;
    this.tags = tags;
    this.content = content;
    this.status = status;
    this.publishedAt = publishedAt || null;
    this.lastEditedAt = lastEditedAt || null;
  }

  get get() {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      tags: this.tags,
      content: this.content,
      status: this.status,
      publishedAt: this.publishedAt,
      lastEditedAt: this.lastEditedAt,
    };
  }
}
