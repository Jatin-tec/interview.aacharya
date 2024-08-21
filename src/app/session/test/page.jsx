"use client";
import Image from "next/image";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Controls from "../controls";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function getLocalStream() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((localMediaStream) => {
      const video = document.querySelector("video");
      video.srcObject = localMediaStream;
    })
    .catch((error) => {
      console.log("Rejected!", error);
    });
}

export default function Session() {
  return (
    <main className="w-screen h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] rounded-lg border"
      >
        <ResizablePanel defaultSize={75} minSize={60}>
          <div className="flex flex-col justify-center h-full p-10">
            <div className="flex justify-between text-lg font-medium mt-2 mx-5">
              9:00 AM | Google Interview - Tech Round
              <span className="border-2 border-red-300 rounded-full px-4">
                30:47 mins
              </span>
            </div>
            <div className="relative  rounded-2xl shadow border border-white overflow-hidden m-5">
              <video
                autoPlay
                playsInline
                className="object-cover w-full h-full"
              />
              <Badge className="absolute bottom-2 left-2 w-fit px-3 border rounded-full select-none font-semibold">
                Raksha
              </Badge>
              <div className="absolute bottom-5 right-5 flex flex-col items-center justify-center bg-accent border-muted-foreground border-4 rounded-2xl shadow h-[200px] w-[200px] p-6 opacity-80">
                <Image src="/men.png" alt="Harshal" width={100} height={100} />
                <Badge className="absolute bottom-2 left-2 w-fit px-3 border rounded-full select-none font-semibold">
                  Harshal
                </Badge>
              </div>
            </div>
            <Controls />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          className="p-2"
          defaultSize={25}
          minSize={20}
          maxSize={30}
        >
          <div className="text-lg font-bold text-center border-b mb-2 pb-2">
            Live Captions
          </div>
          <div className="w-full flex flex-col space-y-4 overflow-y-scroll max-h-screen p-4">
            <div className="flex flex-col self-start">
              <span className="select-none text-md font-semibold">Harshal</span>
              <span className="rounded-2xl rounded-tl-none bg-accent p-2 w-fit px-4">
                This message from AI
              </span>
            </div>
            <div className="flex flex-col self-end">
              <span className="flex self-end text-md font-semibold select-none">
                Raksha
              </span>
              <span className="rounded-2xl rounded-tr-none bg-accent p-2 w-fit px-4">
                This message from Human
              </span>
            </div>
            <div className="flex flex-col self-start">
              <span className="text-md font-semibold">Harshal</span>
              <span className=" flex gap-1 rounded-2xl rounded-tl-none bg-accent p-4 w-fit">
                <div className="animate-bounce w-2 h-2 bg-gray-400 dark:bg-gray-200 rounded-full"></div>
                <div className="animate-bounce delay-200 w-2 h-2 bg-gray-400 dark:bg-gray-200 rounded-full"></div>
                <div className="animate-bounce delay-300 w-2 h-2 bg-gray-400 dark:bg-gray-200 rounded-full"></div>
              </span>
            </div>
            <Button onClick={getLocalStream}>Start Video</Button>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
