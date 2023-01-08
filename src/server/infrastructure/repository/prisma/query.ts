type OrderByDesignation = "desc" | "asc";

export interface PrismaQuery {
  select?: { [key: string]: any };
  where?: { [key: string]: string | number } | undefined;
  orderBy?:
    | { [key: string]: OrderByDesignation }
    | { [key: string]: OrderByDesignation }[]
    | undefined;
}
