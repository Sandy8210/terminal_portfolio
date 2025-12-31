import { useState } from "react";
import { projectsData } from "./projectsData";

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 px-6 py-5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4 bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Exploring the intersection of design and technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <div
                className={`absolute -inset-0.5 bg-linear-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-0 group-hover:opacity-75 transition duration-500 ${
                  hoveredIndex === index ? "animate-pulse" : ""
                }`}
              />

              <div className="relative h-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500">
                <div className="inline-block mb-4">
                  <span className="px-4 py-1.5 text-xs font-semibold bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-300">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-slate-800/50 text-cyan-400 rounded-lg border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-pink-400 transition-colors duration-300 group/link"
                >
                  <span>Explore Project</span>
                  <svg
                    className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>

                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-purple-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
