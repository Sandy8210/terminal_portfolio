import Education from "../components/education/Education";
import Experience from "../components/experience/Experience";
import HelpOutput from "../components/HelpOutput/HelpOutput";
import Projects from "../components/projects/Projects";
// import Service from "../components/service/Service";
import Welcome from "../components/welcome/Welcome";
import About from "./../about/About";

const commandHandlers: Record<string, () => React.ReactNode> = {
  welcome: () => <Welcome />,
  // service: () => <Service />,
  help: () => <HelpOutput />,
  about: () => <About />,
  education: () => <Education />,
  experience: () => <Experience />,
  projects: () => <Projects />,
};

export default commandHandlers;
