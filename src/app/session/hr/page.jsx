"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Controls from "../controls";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export default function Session() {
  const [warnings, setWarnings] = useState(0);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const endSession = () => {
    // Define your end session logic here
    alert("Session ended due to multiple warnings.");
  };

  useEffect(() => {
    // Restrict copy, paste, and right-click
    const restrictActions = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener("copy", restrictActions);
    document.addEventListener("paste", restrictActions);
    document.addEventListener("contextmenu", restrictActions);

    // Monitor fullscreen and visibility state
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "hidden" ||
        !document.fullscreenElement
      ) {
        setWarnings((prevWarnings) => {
          const newWarnings = prevWarnings + 1;
          if (newWarnings > 5) {
            endSession();
          } else {
            setIsAlertOpen(true);
          }
          return newWarnings;
        });
      }
    };

    document.addEventListener("fullscreenchange", handleVisibilityChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("copy", restrictActions);
      document.removeEventListener("paste", restrictActions);
      document.removeEventListener("contextmenu", restrictActions);
      document.removeEventListener("fullscreenchange", handleVisibilityChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Request fullscreen mode
  const requestFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  return (
    <main className="w-screen h-screen">
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex gap-2">
              <ShieldCheck /> Secure Options
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2 text-sm text-gray-800 dark:text-white">
              Allow all permissions and avoid cheating during the interview.
              <ol className="font-semibold">
                <li>1. Copy and Paste are strictly not allowed.</li>
                <li>2. Don't switch Tabs during the interview</li>
                <li>3. Allow fullscreen mode to start.</li>
              </ol>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-green-500 text-white dark:text-white"
              onClick={requestFullScreen}
            >
              Start
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex gap-2">
              <ShieldAlert /> Secure Warning
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tab switching and exiting fullscreen is not allowed during the
              interview. This may lead to disqualification.
              <div className="text-sm text-red-700 font-semibold mt-4">
                Warnings: {warnings}/5
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={requestFullScreen}>
              I Understand
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
            <img
              src="https://3277184.fs1.hubspotusercontent-na1.net/hubfs/3277184/Imported_Blog_Media/woman-using-video-call-etiquette-1.jpg"
              className="object-cover"
            />
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
