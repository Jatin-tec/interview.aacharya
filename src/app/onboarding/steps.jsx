import Link from "next/link";

export default function Stepper({ step }) {
  const steps = [
    { name: "Resume", path: "/onboarding/resume" },
    { name: "Job Description", path: "/onboarding/jobrole" },
    { name: "Schedule", path: "/onboarding/schedule" },
  ];

  return (
    <div className="flex items-center">
      {steps.map((stepInfo, index) => (
        <div key={stepInfo.name} className="flex items-center relative">
          <Link href={stepInfo.path} legacyBehavior>
            <a
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step === index + 1 ? "bg-black text-white" : "bg-gray-300 text-black"}`}
            >
              {index + 1}
            </a>
          </Link>
          <span
            className={`select-none ml-2 text-center ${step === index + 1 ? "text-black" : "text-gray-500"}`}
          >
            {stepInfo.name}
          </span>
          {index < steps.length - 1 && (
            <div className="w-16 h-0.5 bg-gray-300 mx-4"></div>
          )}
        </div>
      ))}
    </div>
  );
}
