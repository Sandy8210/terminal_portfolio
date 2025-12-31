import { experiences } from "./experienceData";

const Experience = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-green-400">
        Experience
      </h2>

      <div className="space-y-8 sm:space-y-10">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="relative rounded-2xl p-px overflow-hidden
              bg-linear-to-r from-green-400 via-yellow-400 to-pink-500
              animate-border"
          >
            <div className="rounded-2xl bg-gray-900 p-4 sm:p-6">
              {/* HEADER */}
              <div className="flex flex-col gap-1 sm:gap-0 sm:flex-row sm:items-center sm:justify-between mb-4">
                <h3 className="text-sm sm:text-md font-semibold text-white leading-snug">
                  {exp.role}
                  <span className="block sm:inline text-gray-400">
                    {" "}
                    — {exp.company}
                  </span>
                </h3>

                <span className="text-xs sm:text-sm text-gray-400">
                  {exp.period} • {exp.location}
                </span>
              </div>

              {/* DESCRIPTION */}
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm sm:text-base mb-5">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              {/* TECHNOLOGIES */}
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] sm:text-xs font-bold text-black
                      bg-linear-to-r from-green-400 to-yellow-400
                      px-2.5 py-1 rounded-full whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BORDER ANIMATION */}
      <style>
        {`
          @keyframes border {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animate-border {
            background-size: 300% 300%;
            animation: border 6s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Experience;
