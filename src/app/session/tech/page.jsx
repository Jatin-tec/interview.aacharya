import Image from "next/image";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeBlock from "../code";
import Controls from "../controls";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Session() {
  return (
    <main className="w-screen h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] rounded-lg border"
      >
        <ResizablePanel
          className="p-2"
          defaultSize={25}
          minSize={20}
          maxSize={40}
        >
          <DropdownMenu>
            <DropdownMenuTrigger>
              Change Language
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>JavaScript</DropdownMenuItem>
              <DropdownMenuItem>Java</DropdownMenuItem>
              <DropdownMenuItem>C++</DropdownMenuItem>
              <DropdownMenuItem>Python</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="max-h-[90%] mt-2 mb-2 bg-[#f5f5f5] overflow-y-scroll border rounded-lg">
            <CodeBlock />
          </div>
          <Button>Submit</Button>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75} minSize={50}>
        <div className="flex flex-col justify-center space-y-24 h-full">
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col relative items-center justify-center border rounded-lg shadow h-[300px] w-[500px] p-6">
              <span className="font-semibold">Interviewer</span>
              <Image src="/men.png" alt="Harshal" width={200} height={200} />
              <div className="absolute bottom-2 left-2 w-fit px-3 border rounded-full bg-slate-800 text-white font-semibold">
                Harshal
              </div>
            </div>
            <div className="relative border rounded-lg shadow h-[300px] w-[500px] overflow-hidden">
              <img src="https://3277184.fs1.hubspotusercontent-na1.net/hubfs/3277184/Imported_Blog_Media/woman-using-video-call-etiquette-1.jpg" className="object-cover" />
              <div className="absolute bottom-2 left-2 w-fit px-3 border rounded-full bg-slate-800 text-white font-semibold">
                Raksha
              </div>
            </div>
          </div>
            <Controls />
            </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
