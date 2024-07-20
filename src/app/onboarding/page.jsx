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
import Stepper from "@/components/stepper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import confetti from "canvas-confetti";
import useAxios from "@/context/useAxios";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [resume, setResume] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [interviewType, setInterviewType] = useState("tech");
  const { loading, error, fetchApi } = useAxios();

  const handleNextStep = async () => {
    setStep((prevStep) => prevStep + 1)
  }

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSchedule = async () => {
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
    
    if (!resume || !companyName || !jobDescription || !date || !interviewType) {
      return
    }
    
    const formData = new FormData()
    formData.append("resume", resume)
    formData.append("company_name", companyName)
    formData.append("job_description", jobDescription)
    formData.append("interview_date", new Date(date).toISOString())
    formData.append("interview_type", interviewType)

    const apiParams = {
      url: "/interview/schedule/",
      method: "POST",
      body: formData,
    };

    console.log("apiParams", apiParams)

    const response = await fetchApi(apiParams)

    if (!error && response.status === 201) {
      frame()
    }
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
                        onSelect={(date) => setDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <RadioGroup
                    defaultValue={interviewType}
                    onValueChange={setInterviewType}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="HR" id="r1" />
                      <Label htmlFor="r1">HR Round</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Technical" id="r2" />
                      <Label htmlFor="r2">Tech/Coding Round</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Managerial" id="r3" />
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
                  <DialogTrigger asChild>
                    <Button className="w-1/2 ml-2" onClick={handleSchedule}>
                      Schedule
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Interview Scheduled</DialogTitle>
                      <DialogDescription>
                        Congrats! We have scheduled your interview and sent you
                        a magic link via email.
                      </DialogDescription>
                    </DialogHeader>
                    <Button>Complete</Button>
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
