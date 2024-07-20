import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Bug,
  MessageCircleQuestion,
  Mic,
  MicOff,
  Volume2Icon,
} from "lucide-react";
import CodeBlock from "./code";

export default function Controls() {
  return (
    <div className="flex flex-col  items-center justify-center mx-10 max-h-[200px] space-y-6">
      <div className="flex flex-col gap rounded-2xl shadow-lg bg-accent p-3">
        <span className="text-lg font-medium">Question 1</span>
        <span className="text-sm max-h-28 overflow-y-scroll">
          Here is the full question Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Perspiciatis, cumque maxime omnis incidunt
          repudiandae architecto impedit quam nobis assumenda alias earum quo ex
          atque, ad est quidem? Id, quas consequuntur.
        </span>
      </div>
      <div className="flex gap-4 ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full p-2"
              >
                <MicOff />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mic Off</p>
            </TooltipContent>
          </Tooltip>
          <Button
            size="icon"
            className="rounded-full text-md font-semibold bg-red-600 hover:bg-white border-2 border-transparent hover:border-2 hover:text-red-500 hover:border-red-500 gap-1.5"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-100 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-200"></span>
            </span>
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full p-2"
              >
                <Volume2Icon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Replay Last</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full p-2"
              >
                <Bug />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Report Bug</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <CodeBlock />
            </TooltipTrigger>
            <TooltipContent>
              <p>Code Arena</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
