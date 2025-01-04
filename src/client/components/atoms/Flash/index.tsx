"use client";
import React, { createContext, useContext, useState } from "react";
import style from "./style.module.scss";

export const FLASH_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
} as const;
type TFlashMessageTypes = (typeof FLASH_TYPE)[keyof typeof FLASH_TYPE];

const FlashMessageContext = createContext({
  showFlashMessage: (message: string, type: TFlashMessageTypes) => {},
});

export const FlashMessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [flash, setFlash] = useState<{ message: string; type: string } | null>(
    null,
  );

  const showFlashMessage = (message: string, type: TFlashMessageTypes) => {
    setFlash({ message, type });
    const duration = Math.max(message.length * 100, 2000); // 1文字あたり100ms, 最低2000ms
    setTimeout(() => {
      setFlash(null);
    }, duration);
  };

  const closeFlash = () => {
    setFlash(null);
  };

  return (
    <FlashMessageContext.Provider value={{ showFlashMessage }}>
      {children}
      {flash && (
        <nav
          className={`${style.flash} ${
            flash.type === FLASH_TYPE.SUCCESS
              ? style.success
              : flash.type === FLASH_TYPE.ERROR
                ? style.error
                : style.info
          }`}
          onClick={closeFlash}
        >
          {flash.message}
        </nav>
      )}
    </FlashMessageContext.Provider>
  );
};

// Contextを使用するためのカスタムフック
export const useFlashMessage = () => useContext(FlashMessageContext);
