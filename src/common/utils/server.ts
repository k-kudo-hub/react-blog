/**
 * httpリクエストに関する共通関数群
 */
import { generateUrl } from "src/common/utils/url";

interface RequestConditionType {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
}

export async function get(route: string, params = {}) {
  const url = generateUrl({ route, params });
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("データの取得に失敗しました。");
    }
    return response.json();
  } catch (e) {
    console.error(e);
    // TODO: GETの失敗をユーザーに知らせる処理
  }
}

export async function post(route: string, body: object) {
  const condition = _generateRequestCondition({
    method: "POST",
    body,
  });
  try {
    const response = await fetch(route, condition);
    if (!response.ok) {
      throw new Error("データの更新に失敗しました。");
    }
    return response.json();
  } catch (e) {
    console.error(e);
    // TODO: POSTの失敗をユーザーに知らせる処理
  }
}

const _generateRequestCondition = ({
  method,
  body = {},
}: RequestConditionType) => {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
};
