import React from "react";

export interface TerminalClearInterface {
  setCommandHistory: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
  setShowWelcome: React.Dispatch<React.SetStateAction<boolean>>;
  setInputVal: React.Dispatch<React.SetStateAction<string>>;
}

export const terminalClear = ({
  setCommandHistory,
  setShowWelcome,
  setInputVal,
}: TerminalClearInterface): void => {
  setCommandHistory([]);
  setShowWelcome(false);
  setInputVal("");
};