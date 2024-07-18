"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  BriefcaseBusiness,
  CalendarClock,
  Calendar as CalendarIcon,
  TicketPlus,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Stepper from "../steps";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import confetti from "canvas-confetti";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [resume, setResume] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [date, setDate] = useState();
  const [interviewType, setInterviewType] = useState("tech");

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSchedule = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  return (
    <div>
      <main className="flex flex-col space-y-8 items-center justify-center h-screen">
        <Stepper step={step} />
        <Card className="mx-auto w-full max-w-lg">
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap">
                  <FileText /> Upload Resume/CV
                </CardTitle>
                <CardDescription>
                  For personalizing your experience we need your resume, don't
                  worry we will keep it safe.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="picture">Resume</Label>
                    <Input
                      id="picture"
                      type="file"
                      className="cursor-pointer"
                      onChange={(e) => setResume(e.target.files[0])}
                    />
                  </div>
                  <Button className="w-full gap-4" onClick={handleNextStep}>
                    Next
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap">
                  <BriefcaseBusiness /> Job Description
                </CardTitle>
                <CardDescription>
                  Tell us the job description of the vacancy you are applying
                  for. This will help us to tailor personalized questions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid w-full gap-2">
                    <Input
                      type="text"
                      placeholder="Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <Textarea
                      className="h-48"
                      placeholder="Paste your job description here"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                    <div className="flex justify-between">
                      <Button
                        className="w-1/2 mr-2"
                        onClick={handlePreviousStep}
                      >
                        Back
                      </Button>
                      <Button className="w-1/2 ml-2" onClick={handleNextStep}>
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <CalendarClock /> Schedule Interview
                </CardTitle>
                <CardDescription>
                  Interview at your convenience. Pick a date and we'll send you
                  the magic link.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <RadioGroup
                    defaultValue={interviewType}
                    onValueChange={setInterviewType}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hr" id="r1" />
                      <Label htmlFor="r1">HR Round</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tech" id="r2" />
                      <Label htmlFor="r2">Tech/Coding Round</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mr" id="r3" />
                      <Label htmlFor="r3">MR Round</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <div className="flex justify-betwee p-4 w-full">
                <Button className="w-1/2 mr-2" onClick={handlePreviousStep}>
                  Back
                </Button>
                <Dialog>
                  <DialogTrigger>
                    <Button
                      onClick={handleSchedule}
                      className="w-[220px] gap-2"
                    >
                      <TicketPlus />
                      Schedule
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirmation!</DialogTitle>
                      <DialogDescription>
                        <iframe
                          className="w-28 h-28"
                          src="https://lottie.host/embed/9dcee1be-d8e0-47c7-b5b7-bd901c7e217d/TeygC2mSFW.lottie"
                        ></iframe>
                        Your interview has been scheduled. We will send you the
                        magic link with all the details.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )}
        </Card>
      </main>
    </div>
  );
}
