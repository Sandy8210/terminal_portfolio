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
    const promises = letters.map((char) =>
      figlet.textSync(char, { font: "Slant" })
    );

    Promise.all(promises)
      .then((results) => {
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
                ? "text-orange-400 m-0"
                : "text-cyan-400"
              : "text-terminalMuted";

            const letterLine = paddedLetters[idx][i];
            line += `<span class="${colorClass}">${letterLine}</span>`;
          });
          coloredLines.push(line);
        }

        setAsciiLines(coloredLines);
      })
      .catch((err) => console.error("Figlet error:", err));
  }, []);

  return (
    <div className="mt-2 space-y-2 text-terminalMuted font-mono">
      <div className="flex">
        <div className="w-[50%]">
          <div className="leading-tight whitespace-pre-wrap">
            {asciiLines.map((line, idx) => (
              <p
                className="m-0"
                key={idx}
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ))}
          </div>
          <p>{`Welcome to my terminal portfolio. (Version ${VERSION})`}</p>
          ----
          <p>
            This project's source code can be found in this project's
            <br />
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 underline text-orange-500 underline-offset-4 decoration-solid decoration-current hover:decoration-dashed transition-all duration-300 ease-in-out"
            >
              GitHub repo
            </a>
          </p>
          ----
          <p>For a list of available commands, type `help`.</p>
        </div>
        {/* <div className="w-[50%]">testing</div> */}
      </div>
    </div>
  );
};

export default Welcome;
