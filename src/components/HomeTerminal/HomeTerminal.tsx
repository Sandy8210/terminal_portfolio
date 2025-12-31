import React, { useRef, useState } from "react";
import TermInfo from "./TermInfo";
import Welcome from "../welcome/Welcome";
import commandHandlers from "../../utils/commandHandlers";
import { terminalClear } from "../terminalActions/terminalClear";
import { terminalEcho } from "../terminalActions/TerminalEcho";
import { commandRegistry } from "../../utils/commandRegistry";

const HomeTerminal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputVal, setInputVal] = useState("");
  const [commandRender, setCommandRender] = useState<React.ReactNode[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [tabPressCount, setTabPressCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    setHistoryIndex(null); // stop history navigation
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      if (!inputVal) return;

      const commands = Object.keys(commandRegistry);
      const matches = commands.filter((cmd) => cmd.startsWith(inputVal));

      if (!matches.length) return;

      if (matches.length === 1) {
        setInputVal(matches[0]);
        setTabPressCount(0);
        return;
      }

      if (tabPressCount === 0) {
        setTabPressCount(1);
        return;
      }

      const suggestions = (
        <div key={Date.now()} className="mb-2">
          <div className="flex items-center">
            <TermInfo />
            <span className="ml-2">{inputVal}</span>
          </div>

          {/* Suggestions */}
          <div className="mt-1 flex flex-wrap gap-6 pl-6">
            {matches.map((cmd) => (
              <span key={cmd}>{cmd}</span>
            ))}
          </div>
        </div>
      );

      // Print suggestions as terminal output
      setCommandRender((prev) => [...prev, suggestions]);

      // Force cursor to stay on same input
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });

      setTabPressCount(0);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;

      const newIndex =
        historyIndex === null
          ? history.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(newIndex);
      setInputVal(history[newIndex]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!history.length || historyIndex === null) return;

      const newIndex = historyIndex + 1;

      if (newIndex >= history.length) {
        setHistoryIndex(null);
        setInputVal("");
      } else {
        setHistoryIndex(newIndex);
        setInputVal(history[newIndex]);
      }
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (!inputVal.trim()) return;

      const cmd = inputVal.trim();
      const cmdKey = Date.now();

      setHistory((prev) => [...prev, cmd]); // Add command to history list

      // Handle clear command specially
      if (cmd.toLowerCase() === "clear") {
        terminalClear({
          setCommandRender,
          setShowWelcome,
          setInputVal,
          setShowHistory,
        });
        return;
      }

      if (cmd.toLowerCase() === "history") {
        const historyOutput = (
          <div key={cmdKey} className="mb-2">
            <div className="flex items-center">
              <TermInfo />
              <span className="ml-2">{cmd}</span>
            </div>

            <div className="mt-1">
              {history.map((h, i) => (
                <div key={i}>
                  {i + 1} {h}
                </div>
              ))}
            </div>
          </div>
        );

        setCommandRender((prev) => [...prev, historyOutput]);
        setInputVal("");
        return;
      }

      // Add command and its output to history
      const newEntry = (
        <div key={cmdKey} className="mb-2">
          {/* Command line with prompt */}
          <div className="flex items-center">
            <TermInfo />
            <span className="ml-2">{cmd}</span>
          </div>

          <div className="mt-1">
            {cmd.toLowerCase().startsWith("echo")
              ? terminalEcho(cmd)
              : // : cmd.toLowerCase() === "history"
                // ? (() => {
                //     setShowHistory((prev) => !prev);
                //     return null;
                //   })()
                commandHandlers[cmd.toLowerCase()]?.() ?? (
                  <span className="text-red-400">command not found: {cmd}</span>
                )}
          </div>
        </div>
      );

      setCommandRender((prev) => [...prev, newEntry]);
      setInputVal("");

      setTimeout(() => {
        containerRef.current?.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 0);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
      className="h-screen cursor-text overflow-y-auto bg-gray-900 text-gray-100 p-4 font-mono"
    >
      {showWelcome && (
        <div className="mb-2">
          <div className="flex items-center">
            <TermInfo />
            <span className="ml-2">welcome</span>
          </div>

          <div className="mt-1">
            <Welcome />
          </div>
        </div>
      )}

      {/* Command history */}
      {commandRender.map((entry) => entry)}

      {showHistory && (
        <div className="mb-2">
          <div className="mt-1">
            {history.map((entry) => (
              <li>{entry}</li>
            ))}
          </div>
        </div>
      )}

      {/* Current input line - always at the bottom */}
      <div className="flex items-center">
        <TermInfo />
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          spellCheck={false}
          autoFocus
          autoCapitalize="off"
          value={inputVal}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none flex-1 min-w-0 caret-green-400 text-white ml-2 whitespace-nowrap text-[16px]"
        />
      </div>
    </div>
  );
};

export default HomeTerminal;
