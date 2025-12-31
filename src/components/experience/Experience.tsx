import { experiences } from "./experienceData";

const Experience = () => {
  return (
    <section className="max-w-5xl px-4">
      <h2 className="text-xl font-bold mb-3 text-green-400">Experience</h2>

      <div className="space-y-10">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="relative rounded-2xl p-0.5 overflow-hidden
              bg-linear-to-r from-green-400 via-yellow-400 to-pink-500
              animate-border"
          >
            <div className="rounded-2xl bg-gray-900 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-md font-semibold text-white">
                  {exp.role}
                  <span className="text-gray-400"> — {exp.company}</span>
                </h3>
                <span className="text-sm text-gray-400">
                  {exp.period} • {exp.location}
                </span>
              </div>

              <ul className="list-disc list-inside text-gray-300 space-y-1 mb-5">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold text-black
                      bg-linear-to-r from-green-400 to-yellow-400
                      px-3 py-1 rounded-full"
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
