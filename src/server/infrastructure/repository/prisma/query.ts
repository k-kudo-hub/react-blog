type OrderByDesignation = "desc" | "asc";

export interface PrismaFindManyQuery {
  select?: { [key: string]: any };
  include?: { [key: string]: any };
  where: { [key: string]: string | number | boolean };
  orderBy?:
    | { [key: string]: OrderByDesignation }
    | { [key: string]: OrderByDesignation }[]
    | undefined;
  skip?: number | undefined;
  take?: number | undefined;
}

export interface PrismaFindUniqueQuery {
  select?: { [key: string]: any };
  include?: { [key: string]: any };
  where: { identityCode: string | undefined };
}
