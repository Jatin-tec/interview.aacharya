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
import { useToast } from "@/components/ui/use-toast"


export default function MultiStepForm() {
  const [resume, setResume] = useState(null);
  const [formState, setFormState] = useState({
    step: 1,
    company_name: '',
    job_title: '',
    job_description: '',
    interview_date: new Date(),
    interview_type: 'Technical'
  })

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const { error, fetchApi } = useAxios()

  const { toast } = useToast()

  const handleNextStep = async () => {
    if (!formValidator()) return
    handleChange({ target: { name: "step", value: formState.step + 1 } })
  }

  const handlePreviousStep = () => {
    handleChange({ target: { name: "step", value: formState.step - 1 } })
  };

  const formValidator = () => {
    if (formState.step === 1 && !resume) {
      toast({
        variant: "destructive",
        title: "Missing required fields",
        description: "Please upload your resume",
      });
      return false
    }
    if (formState.step === 2 && !formState.company_name && !formState.job_title && !formState.job_description) {
      toast({
        variant: "destructive",
        title: "Missing required fields",
        description: "Please fill all the fields",
      });
      return false
    }
    return true
  }

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

    const formData = new FormData()
    formData.append("resume", resume)
    formData.append("company_name", formState.company_name)
    formData.append("job_title", formState.job_title)
    formData.append("job_description", formState.job_description)
    formData.append("interview_date", new Date(formState.interview_date).toISOString())
    formData.append("interview_type", formState.interview_type)

    const apiParams = {
      url: "/interview/schedule/",
      method: "POST",
      body: formData,
    };

    const response = await fetchApi(apiParams)

    if (!error && response.status === 201) {
      frame()
    }
  };

  return (
    <div>
      <main className="flex flex-col space-y-8 items-center justify-center h-screen">
        <Stepper step={formState.step} />
        <Card className="mx-auto w-full max-w-lg">
          {formState.step === 1 && (
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
                      name="resume"
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

          {formState.step === 2 && (
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
                      name="company_name"
                      placeholder="Company Name"
                      value={formState.company_name}
                      onChange={handleChange}
                    />
                    <Input
                      type="text"
                      name="job_title"
                      placeholder="Job Title"
                      value={formState.job_title}
                      onChange={handleChange}
                    />
                    <Textarea
                      className="h-48"
                      name="job_description"
                      placeholder="Paste your job description here"
                      value={formState.job_description}
                      onChange={handleChange}
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

          {formState.step === 3 && (
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
                          !formState.interview_date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formState.interview_date ? format(formState.interview_date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formState.interview_date}
                        onSelect={(date) => handleChange({ target: { name: "interview_date", value: date }})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <RadioGroup
                    defaultValue={formState.interview_type}
                    onValueChange={(value) => {handleChange({ target: { name: "interview_type", value }})}} 
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
