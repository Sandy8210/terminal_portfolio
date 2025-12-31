import { useRef, useState } from "react";
import TermInfo from "./TermInfo";
import Welcome from "../welcome/Welcome";
import commandHandlers from "../../utils/commandHandlers";
import { terminalClear } from "../terminalActions/terminalClear";
import { terminalEcho } from "../terminalActions/TerminalEcho";

const HomeTerminal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState<React.ReactNode[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!inputVal.trim()) return;

      const cmd = inputVal.trim();
      const cmdKey = Date.now();

      // Handle clear command specially
      if (cmd.toLowerCase() === "clear") {
        terminalClear({
          setCommandHistory,
          setShowWelcome,
          setInputVal,
        });
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
              : commandHandlers[cmd.toLowerCase()]?.() ?? (
                  <span className="text-red-400">command not found: {cmd}</span>
                )}
          </div>
        </div>
      );

      setCommandHistory((prev) => [...prev, newEntry]);
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
      {commandHistory.map((entry) => entry)}

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
          className="bg-transparent outline-none flex-1 caret-green-400 text-white ml-2"
        />
      </div>
    </div>
  );
};

export default HomeTerminal;
