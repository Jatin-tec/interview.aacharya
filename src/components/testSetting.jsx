"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Settings, Mic, Speaker, Camera } from "lucide-react";

export default function TestSetting() {
  const [audioDevices, setAudioDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);
  const [outputDevices, setOutputDevices] = useState([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const getMediaPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: selectedAudioDevice },
        video: { deviceId: selectedVideoDevice },
      });

      const audioTracks = stream.getAudioTracks();
      const videoTracks = stream.getVideoTracks();
      setAudioStream(new MediaStream(audioTracks));
      setVideoStream(new MediaStream(videoTracks));
      if (videoRef.current) {
        videoRef.current.srcObject = new MediaStream(videoTracks);
      }

      const devices = await navigator.mediaDevices.enumerateDevices();
      setAudioDevices(devices.filter((device) => device.kind === "audioinput"));
      setVideoDevices(devices.filter((device) => device.kind === "videoinput"));
      setOutputDevices(
        devices.filter((device) => device.kind === "audiooutput"),
      );

      // If no device is selected, choose the first available device
      if (!selectedAudioDevice && audioTracks.length > 0) {
        setSelectedAudioDevice(audioTracks[0].label);
      }
      if (!selectedVideoDevice && videoTracks.length > 0) {
        setSelectedVideoDevice(videoTracks[0].label);
      }

      // Audio visualization setup
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(
        new MediaStream(audioTracks),
      );
      source.connect(analyser);
      setAudioContext(audioContext);
      setAnalyser(analyser);
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  const stopMediaTracks = (stream) => {
    stream?.getTracks().forEach((track) => track.stop());
  };

  useEffect(() => {
    if (analyser && canvasRef.current) {
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext("2d");

      const draw = () => {
        requestAnimationFrame(draw);
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = canvas.width / 10; // Change the number of bars here
        let barHeight;
        let x = 0;

        for (let i = 0; i < 10; i++) {
          // Use the same number of bars
          barHeight = dataArray[i] / 2;
          canvasCtx.fillStyle = `green`;
          canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      };

      draw();
    }
  }, [analyser]);

  const playTestAudio = () => {
    const audio = new Audio("/speak.mp3");
    audio.play();
    setPlaying(true);
    audio.onended = () => {
      setPlaying(false);
    };
  };

  return (
    <>
      {/* Test Mic/Cam Settings */}
      <Dialog
        onOpenChange={(open) => {
          if (open) {
            getMediaPermissions();
          } else {
            stopMediaTracks(audioStream);
            stopMediaTracks(videoStream);
            setAudioStream(null);
            setVideoStream(null);
            audioContext?.close();
            setAudioContext(null);
            setAnalyser(null);
          }
        }}
      >
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full ml-auto flex-1 sm:flex-initial"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Please allow audio and video permissions to start the interview.
              Also check the camera and microphone settings before starting.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 items-end gap-5">
            <div>
              <Label
                className="m-1 flex items-center text-sm text-muted-foreground"
                htmlFor="mic"
              >
                <Mic className="w-4 h-4" /> Microphone
              </Label>
              <Select
                id="mic"
                value={selectedAudioDevice}
                onValueChange={setSelectedAudioDevice}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Microphone" />
                </SelectTrigger>
                <SelectContent>
                  {audioDevices.map((device) => (
                    <SelectItem key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <canvas ref={canvasRef} className="w-40 h-8"></canvas>
          </div>

          <div className="grid grid-cols-2 items-end gap-5">
            <div>
              <Label
                className="m-1 flex items-center text-sm mt-2 text-muted-foreground"
                htmlFor="speaker"
              >
                <Speaker className="h-4 w-4" /> Speaker
              </Label>
              <Select
                id="speaker"
                value={selectedAudioDevice}
                onValueChange={setSelectedAudioDevice}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Speaker" />
                </SelectTrigger>
                <SelectContent>
                  {outputDevices.map((device) => (
                    <SelectItem key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="secondary"
              className="w-fit rounded-full"
              onClick={playTestAudio}
            >
              {playing ? "Playing" : "Test"}
            </Button>
          </div>

          <div className="grid grid-cols-2 items-center gap-5">
            <div>
              <Label
                className="m-1 flex items-center text-sm text-muted-foreground"
                htmlFor="cam"
              >
                <Camera className="w-4 h-4 mr-1" /> Camera
              </Label>
              <Select
                id="cam"
                value={selectedVideoDevice}
                onValueChange={setSelectedVideoDevice}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Camera" />
                </SelectTrigger>
                <SelectContent>
                  {videoDevices.map((device) => (
                    <SelectItem key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <video
              ref={videoRef}
              autoPlay
              className="border mt-4 w-28 h-20 rounded-md object-cover"
              playsInline
              muted
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
