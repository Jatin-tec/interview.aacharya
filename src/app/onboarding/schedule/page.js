"use client";
import Link from "next/link";
import confetti from "canvas-confetti";

import * as React from "react";
import { format } from "date-fns";
import {
  FileText,
  Calendar as CalendarIcon,
  CalendarClock,
  TicketPlus,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Stepper from "../steps";

export default function Schedule() {
  const [date, setDate] = React.useState();

  const handleClick = () => {
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
    <main className="flex flex-col space-y-8 items-center justify-center h-screen">
      <Stepper step={3} />
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <CalendarClock /> Schedule Interview
          </CardTitle>
          <CardDescription>
            Interview at your convenience. Pick a date and will send you the
            magic link.
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
            <RadioGroup defaultValue="tech">
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
            <Dialog>
              <DialogTrigger>
                hello
                <Link href="#">
                  <Button onClick={handleClick} className="w-full gap-2">
                    <TicketPlus />
                    Schedule
                  </Button>
                </Link>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmation!</DialogTitle>
                  <DialogDescription>
                    <iframe
                      className="w-28 h-28"
                      src="https://lottie.host/embed/9dcee1be-d8e0-47c7-b5b7-bd901c7e217d/TeygC2mSFW.lottie"
                    ></iframe>
                    Your Interview has been scheduled. We will send you the
                    magic link with all the details.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
