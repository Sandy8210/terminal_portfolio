export const terminalEcho = (cmd: string): React.ReactNode => {
  const text = cmd.replace(/^echo\s*/i, "");
  return <div className="whitespace-pre">{text}</div>;
};
