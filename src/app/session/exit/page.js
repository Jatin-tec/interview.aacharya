"use client";
import { MarqueeDemo } from "@/components/marketing/testmonial";

export default function Feedback() {
  return (
    <>
      <script async src="https://tally.so/widgets/embed.js"></script>
      <main className="m-0 h-screen w-screen overflow-hidden flex">
        <div className="w-1/3 h-full flex-col flex items-start justify-center p-10">
          <h1 className="text-3xl font-bold">Interview Ended</h1>
          <p className="text-lg my-4">
            Thank you for your time and effort. We would love to hear your
            feedback.
          </p>
          <MarqueeDemo />
        </div>
        <iframe
          className="w-2/3 border-0 bg-accent"
          data-tally-src="https://tally.so/r/mV8Xvj?hideTitle=1&name=Harshal&email=himanshuagni@gmail.com&interview_id=9986437365"
          width="100%"
          height="100%"
          frameBorder={0}
          marginHeight="0"
          marginWidth="0"
        ></iframe>
      </main>
    </>
  );
}
