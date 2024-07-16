import { Button } from "@/components/ui/button";
import { Bug, MessageCircleQuestion, Mic, Volume2Icon } from "lucide-react";

export default function Controls() {
  return (
    <div className="flex flex-col  items-center justify-center mx-10 max-h-[200px] space-y-6">
      <div className="flex flex-col gap rounded-lg shadow-lg border border-slate-400 text-slate-800 p-3">
        <span className="text-xl font-bold">Question: 1</span>
        <span className="text-sm max-h-28 overflow-y-scroll">
          Here is the full question Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Perspiciatis, cumque maxime omnis incidunt
          repudiandae architecto impedit quam nobis assumenda alias earum quo ex
          atque, ad est quidem? Id, quas consequuntur.
        </span>
      </div>
      <div className="flex gap-4 ">
        <Button className="text-md font-semibold bg-red-600 hover:bg-white border-2 border-transparent hover:border-2 hover:text-red-500 hover:border-red-500 gap-1.5">
          <Mic />
          23:34
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400"></span>
          </span>
        </Button>
        <Button className="gap-1.5 text-md font-semibold">
          <MessageCircleQuestion />
          Followup
        </Button>
        <Button className="gap-1.5 text-md font-semibold">
          <Volume2Icon />
          Replay
        </Button>
        <Button className="gap-1.5 text-md font-semibold">
          <Bug />
          Report
        </Button>
      </div>
    </div>
  );
}
