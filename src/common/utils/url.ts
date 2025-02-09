/**
 * URL操作に関する共通関数群
 */
import { config } from "@config/server";

interface VariableLengthType {
  [key: string]: string | number | [];
}

interface UrlParamType {
  route: string;
  params?: VariableLengthType | {};
}

/**
 * @param route ルーティング。システムのAPIを指定する場合は/apiより後の部分を渡す。
 * @param params クエリパラメータに変換するオブジェクト
 * @returns リクエストURL
 */
export const generateApiUrl = ({ route, params = {} }: UrlParamType) => {
  const queryString = _parseObjectToParamString(params);
  if (route.startsWith("/")) {
    const baseUrl = getBaseUrl();
    return `${baseUrl}/api${route}${queryString}`;
  } else if (route.startsWith("http") || route.startsWith("https")) {
    return `${route}${queryString}`;
  } else {
    throw new Error("URL設定が正しくありません。");
  }
};

/**
 * 環境変数をもとに、APIのURLを生成する
 * @returns 環境変数に基づくAPIのURL
 */
export const getBaseUrl = () => {
  if (config.SERVER.PORT) {
    return `${config.SERVER.PROTOCOL}://${config.SERVER.HOST}:${config.SERVER.PORT}`;
  }
  return `${config.SERVER.PROTOCOL}://${config.SERVER.HOST}`;
};

/**
 * オブジェクトをリクエストパラメータに変換する
 * 例) {a:1, b:2} -> ?a=1&b=2
 * @param object パラメータに変換するオブジェクト
 * @returns リクエストパラメータ
 */
const _parseObjectToParamString = (object: VariableLengthType = {}) => {
  if (!Object.keys(object).length) return "";

  const initialValue = "";
  const queryString = Object.keys(object).reduce((resultStr, key, index) => {
    if (index === 0) {
      return `?${key}=${object[key]}`;
    } else {
      return `${resultStr}&${key}=${object[key]}`;
    }
  }, initialValue);

  return queryString;
};
