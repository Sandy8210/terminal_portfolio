import { educationData } from "./educationData";

const Education = () => {
  return (
    <section className="relative max-w-3xl font-mono">
      <h2 className="text-lg font-semibold text-green-400 mb-6">Education</h2>

      <div
        className="absolute left-1.75 top-10 bottom-0 w-0.5
        bg-linear-to-b from-green-400 via-yellow-400 to-pink-500
        animate-line"
      />

      <div className="space-y-8 relative">
        {educationData.map((edu, index) => (
          <div key={index} className="grid grid-cols-[16px_1fr] gap-4">
            <div className="flex justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 mt-1.5" />
            </div>

            <div>
              <div className="text-gray-100 font-medium">{edu.title}</div>
              <div className="text-gray-400 text-sm">
                {edu.institute} · {edu.period}
              </div>
              <div className="text-gray-300 text-sm">{edu.description}</div>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes lineMove {
            0% { background-position: 0% 0%; }
            100% { background-position: 0% 100%; }
          }

          .animate-line {
            background-size: 100% 300%;
            animation: lineMove 5s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Education;
