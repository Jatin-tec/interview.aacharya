"use client";
import { useState, useEffect } from "react";

export function PushToTalk() {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  useEffect(() => {
    if (!navigator.mediaDevices) return;

    // Request microphone access and setup MediaRecorder
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        setAudioChunks((prev) => [...prev, event.data]);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        // Send audioBlob to backend or process it as needed
      };
    });

    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!recording) {
          setRecording(true);
          mediaRecorder.start();
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (recording) {
          setRecording(false);
          mediaRecorder.stop();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [mediaRecorder, recording, audioChunks]);

  return (
    <button className="bg-blue-500 text-white py-2 px-4 rounded">
      {recording ? "Listening..." : "Press Space to Talk"}
    </button>
  );
}
