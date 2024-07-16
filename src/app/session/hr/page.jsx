import Image from "next/image";
import Controls from "../controls";


export default function Session() {
  return (
    <main className="w-screen h-screen">
        <div className="flex flex-col items-center justify-center space-y-24 h-full">
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
    </main>
  );
}
