import React from "react";

export interface TerminalClearInterface {
  setCommandRender: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
  setShowWelcome: React.Dispatch<React.SetStateAction<boolean>>;
  setInputVal: React.Dispatch<React.SetStateAction<string>>;
  setShowHistory: React.Dispatch<React.SetStateAction<boolean>>;
}

export const terminalClear = ({
  setCommandRender,
  setShowWelcome,
  setInputVal,
  setShowHistory,
}: TerminalClearInterface): void => {
  setCommandRender([]);
  setShowWelcome(false);
  setInputVal("");
  setShowHistory(false);
};
