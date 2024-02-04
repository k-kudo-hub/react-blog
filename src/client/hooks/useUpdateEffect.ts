import { useEffect, useRef, DependencyList } from "react";

/**
 * useEffectの初回レンダリング時に実行しないようにする
 * @param callback 実行したい関数
 * @param dependencies useEffectの第二引数と同じ
 */
export const useUpdateEffect = (
  callback: () => void,
  dependencies: DependencyList,
) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    return callback();
  }, dependencies);
};
