import { useRef } from "react";

const DEFAULT_LIBERATE_MS = 1000;

/**
 * 排他制御を行うhooks.
 * 一定時間内に複数回実行された場合、最初の1回のみ実行する.
 * @param liberateMs 処理を開始してから制御を解放するまでの時間
 * @returns callbackの結果
 */
const useExclusiveControl = () => {
  const executed = useRef<boolean>(false);

  const exclude = async (
    callback: Function,
    liberateMs: number = DEFAULT_LIBERATE_MS,
  ) => {
    if (executed.current) {
      return;
    }
    executed.current = true;
    setTimeout(() => {
      executed.current = false;
    }, liberateMs);

    return callback();
  };

  return exclude;
};

export default useExclusiveControl;
