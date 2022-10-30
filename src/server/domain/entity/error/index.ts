export interface CustomErrorParams {
  code: string;
  statusCode: number;
  message: string;
  info?: { [key: string]: unknown };
}

export default class CustomError extends Error {
  code: string;
  statusCode: number;
  info: { [key: string]: unknown } | null;

  constructor(params: CustomErrorParams) {
    super(params.message);
    this.code = params.code;
    this.statusCode = params.statusCode;
    this.info = params.info || null;
  }
}
