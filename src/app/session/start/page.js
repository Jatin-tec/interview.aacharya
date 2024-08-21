"use client";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Package2,
  Play,
  ShieldCheck,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect, useRef } from "react";

function Instructions({ onNext }) {
  return (
    <div className="flex px-10 flex-col gap-4">
      <h2 className="text-3xl">Instructions</h2>
      <p>
        <b>How Test Timing Works</b>
        <br /> Please make sure you can complete this test in one sitting, as
        the timer cannot be stopped once you begin. Clicking "Agree & Start"
        starts your running timer, even if you are not actively in the test.
        Importantly, the timer does not pause if you log out or get disconnected
        from the assessment.
      </p>
      <Button className="max-w-fit" onClick={onNext}>
        Next <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );
}

function CamAudCheck({
  onBack,
  onNext,
  devices,
  setDevices,
  selectedDevices,
  setSelectedDevices,
}) {
  const [isDevicesSelected, setIsDevicesSelected] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsDevicesSelected(
      selectedDevices.camera &&
        selectedDevices.microphone &&
        selectedDevices.speaker,
    );
  }, [selectedDevices]);

  useEffect(() => {
    const getDevices = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const deviceInfos = await navigator.mediaDevices.enumerateDevices();
        const cameras = deviceInfos.filter(
          (device) => device.kind === "videoinput",
        );
        const microphones = deviceInfos.filter(
          (device) => device.kind === "audioinput",
        );
        const speakers = deviceInfos.filter(
          (device) => device.kind === "audiooutput",
        );
        setDevices({ cameras, microphones, speakers });

        if (videoRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: cameras[0]?.deviceId },
          });
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    };
    getDevices();
  }, [setDevices]);

  return (
    <div className="flex flex-col gap-4 px-10">
      <h2 className="text-3xl flex gap-2 items-center">
        <Video className="w-8 h-8" /> Camera and Audio Check
      </h2>
      <p>
        <b>Before you begin</b>
        <br /> Please ensure you have a working camera and microphone. You will
        be required to enable your camera and microphone during the test.
      </p>
      <div className="w-80 h-44 ">
        <video
          ref={videoRef}
          autoPlay
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <Select
        onValueChange={(value) =>
          setSelectedDevices({ ...selectedDevices, camera: value })
        }
      >
        <SelectTrigger className="w-36 border-foreground">
          Select Camera
        </SelectTrigger>
        <SelectContent>
          {devices.cameras.map((device) => (
            <SelectItem key={device.deviceId} value={device.deviceId}>
              {device.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) =>
          setSelectedDevices({ ...selectedDevices, microphone: value })
        }
      >
        <SelectTrigger className="w-36 border-foreground">
          Select Mic
        </SelectTrigger>
        <SelectContent>
          {devices.microphones.map((device) => (
            <SelectItem key={device.deviceId} value={device.deviceId}>
              {device.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) =>
          setSelectedDevices({ ...selectedDevices, speaker: value })
        }
      >
        <SelectTrigger className="w-36 border-foreground">
          Select Speaker
        </SelectTrigger>
        <SelectContent>
          {devices.speakers.map((device) => (
            <SelectItem key={device.deviceId} value={device.deviceId}>
              {device.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mt-4 flex gap-2">
        <Button className="max-w-fit" onClick={onBack}>
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </Button>
        <Button
          className="max-w-fit"
          onClick={onNext}
          disabled={!isDevicesSelected}
        >
          Next <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function StartTest({ onBack, onStart }) {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  useEffect(() => {
    setIsAgreed(isTermsChecked);
  }, [isTermsChecked]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl flex gap-1 items-center">
        <ShieldCheck className="w-8 h-8" /> Secure Environment
      </h2>
      <p>
        <b>Before you begin</b>
        <br /> Please ensure you adhere all our guidelines to maintain a secure
        environment.
      </p>
      <ul className="pl-4 list-disc">
        <li>Copy or Paste is not allowed.</li>
        <li>Switching tabs during the interview is prohibited.</li>
        <li>Fullscreen mode will be enabled.</li>
        <li className="animate-pulse">
          <strong>
            Any type of unwanted activity will affect your final report.
          </strong>
        </li>
      </ul>
      <p>Declaration:</p>
      <div className="flex space-x-2">
        <Checkbox id="terms" onCheckedChange={setIsTermsChecked} />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree not to copy code from any source, including websites, books,
          or colleagues. I may refer to language documentation or an IDE of my
          choice. I agree to not take any screenshots or photographs of any kind
          of the assessment content. I agree not to copy or share Interviews’s
          copyrighted assessment content or questions on any website or forum.
        </label>
      </div>
      <div className="flex space-x-2">
        <Checkbox id="agree" onCheckedChange={setIsTermsChecked} />
        <label
          htmlFor="agree"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to Interview's Terms and Conditions.
        </label>
      </div>
      <Button className="max-w-fit" onClick={onStart} disabled={!isAgreed}>
        Start <Play className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );
}

export default function Start() {
  const [step, setStep] = useState(1);
  const [devices, setDevices] = useState({
    cameras: [],
    microphones: [],
    speakers: [],
  });
  const [selectedDevices, setSelectedDevices] = useState({
    camera: null,
    microphone: null,
    speaker: null,
  });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleStartTest = () => {
    // Logic to start the test
  };

  return (
    <div className="h-screen w-screen flex">
      <div className="w-2/5 h-full flex-col flex items-start justify-around p-10 overflow-hidden">
        <Link
          href="/session"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="">Interview</span>
        </Link>

        <div className="space-y-4">
          <p className="text-muted-foreground text-lg">
            Hey Himanshu Agnihotri,
          </p>
          <p className="text-4xl font-bold">
            Welcome to IBM - General Software Developer - India - Mock Interview
          </p>
          <Badge>xyt-45f-231</Badge>
        </div>

        <div className="gap-2">
          <p>Interview Time: 2023-09-01 12:00PM</p>
          <p>Interview Duration: 60 minutes</p>
        </div>
      </div>
      <div className="w-3/5 bg-accent items-center flex overflow-y-scroll p-14">
        {step === 1 && <Instructions onNext={handleNextStep} />}
        {step === 2 && (
          <CamAudCheck
            onBack={handlePrevStep}
            onNext={handleNextStep}
            devices={devices}
            setDevices={setDevices}
            selectedDevices={selectedDevices}
            setSelectedDevices={setSelectedDevices}
          />
        )}
        {step === 3 && (
          <StartTest onBack={handlePrevStep} onStart={handleStartTest} />
        )}
      </div>
    </div>
  );
}
