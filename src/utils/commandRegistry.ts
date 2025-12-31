export type CommandDef = {
  description: string;
  handler?: () => React.ReactNode;
};

export const commandRegistry: Record<string, CommandDef> = {
  about: {
    description: "learn more about sandy",
  },
  clear: {
    description: "clear the terminal screen",
  },
  echo: {
    description: "print text to the terminal",
  },
  help: {
    description: "list all available commands",
  },
  experience: {
    description: "view professional experience",
  },
  education: {
    description: "view educational background",
  },
  history: {
    description: "show previously entered commands",
  },
  projects: {
    description: "explore personal and professional projects",
  },
  welcome: {
    description: "display the welcome message",
  },
};
