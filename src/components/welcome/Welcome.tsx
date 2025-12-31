import { useEffect, useState } from "react";
import figlet from "figlet";
import slantFont from "figlet/fonts/Slant";

const ColorText = ["N", "G"];
const VERSION = import.meta.env.VITE_VERSION || "1.0.0";
const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;

const Welcome = () => {
  const [asciiLines, setAsciiLines] = useState<string[]>([]);

  useEffect(() => {
    figlet.parseFont("Slant", slantFont);

    const letters = "SaNdY".split("");
    const results = letters.map((char) =>
      figlet.textSync(char, { font: "Slant" })
    );

    const maxHeight = Math.max(...results.map((r) => r.split("\n").length));

    const paddedLetters = results.map((result) => {
      const lines = result.split("\n");
      while (lines.length < maxHeight) lines.push("");
      return lines;
    });

    const coloredLines: string[] = [];

    for (let i = 0; i < maxHeight; i++) {
      let line = "";
      letters.forEach((letter, idx) => {
        const colorClass = ColorText.includes(letter)
          ? letter === "N"
            ? "text-orange-400"
            : "text-cyan-400"
          : "text-terminalMuted";

        line += `<span class="${colorClass}">${paddedLetters[idx][i]}</span>`;
      });
      coloredLines.push(line);
    }

    setAsciiLines(coloredLines);
  }, []);

  return (
    <div className="mt-2 space-y- font-mono text-terminalMuted text-sm sm:text-base">
      <div className="overflow-x-hidden">
        <div className="leading-tight whitespace-pre min-w-max">
          {asciiLines.map((line, idx) => (
            <p
              key={idx}
              className="m-0"
              dangerouslySetInnerHTML={{ __html: line }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p>{`Welcome to my terminal portfolio. (Version ${VERSION})`}</p>

        <p>----</p>

        <p>
          This project's source code can be found in this repositorie's
          <br />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-orange-500 underline-offset-4 decoration-solid hover:decoration-dashed transition-all duration-300"
          >
            GitHub repo
          </a>
        </p>

        <p>----</p>

        <p>
          For a list of available commands, type <code>help</code>.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
