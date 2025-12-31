import { commandRegistry } from "../../utils/commandRegistry";

const HelpOutput = () => {
  return (
    <div className="text-green-400 font-mono text-sm sm:text-base">
      <div className="space-y-1">
        {Object.entries(commandRegistry).map(([cmd, { description }]) => (
          <div
            key={cmd}
            className="flex flex-col sm:flex-row sm:items-start"
          >
            <span className="sm:inline-block sm:w-28 font-semibold">
              {cmd}
            </span>
            <span className="text-gray-300 sm:text-green-400">
              - {description}
            </span>
          </div>
        ))}
      </div>

      {/* HELP TIPS */}
      <div className="mt-4 text-gray-400 space-y-1 text-xs sm:text-sm">
        <div>Tab or Ctrl + i ⇒ autocompletes the command</div>
        <div>Up Arrow ⇒ go back to previous command</div>
        <div>Ctrl + l ⇒ clear the terminal</div>
      </div>
    </div>
  );
};

export default HelpOutput;
