import { commandRegistry } from "../../utils/commandRegistry";

const HelpOutput = () => {
  return (
    <div className="text-green-400 whitespace-pre font-mono">
      {Object.entries(commandRegistry).map(([cmd, { description }]) => (
        <div key={cmd}>
          <span className="inline-block w-24">{cmd}</span>
          <span>- {description}</span>
        </div>
      ))}

      <div className="mt-3 text-gray-400">
        <div>Tab or Ctrl + i =&gt; autocompletes the command</div>
        <div>Up Arrow =&gt; go back to previous command</div>
        <div>Ctrl + l =&gt; clear the terminal</div>
      </div>
    </div>
  );
};

export default HelpOutput;
