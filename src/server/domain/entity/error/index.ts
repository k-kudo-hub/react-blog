export interface CustomErrorParams {
  code?: string; // ex: NOT_FOUND
  statusCode?: number; // ex: 404
  message: string; // ex: '投稿が見つかりませんでした。'
  serverMessage?: string; // ex: Contribute not found at userId: ${userId}.
  info?: { [key: string]: unknown };
}

/**
 * 継承前提のエラークラス
 * このクラスを継承して、各種エラークラスを作成する
 */
export default class CustomError extends Error {
  protected _code: string;
  protected _statusCode: number;
  protected _serverMessage: string;
  protected _info: { [key: string]: unknown } | null;

  constructor(params: CustomErrorParams) {
    super(params.message);
    this._code = params.code || "INTERNAL_SERVER_ERROR";
    this._statusCode = params.statusCode || 500;
    this._serverMessage =
      params.serverMessage || "システムエラーが発生しました。";
    this._info = params.info || null;
  }

  get code() {
    return this._code;
  }

  get statusCode() {
    return this._statusCode;
  }

  get serverMessage() {
    return this._serverMessage;
  }

  get info() {
    return this._info;
  }
}
