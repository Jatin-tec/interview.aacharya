"use client";
import Link from "next/link";
import confetti from "canvas-confetti";
import { HeaderMain } from "@/components/header";

import * as React from "react";
import { CalendarClock, TicketPlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Badge } from "@/components/ui/badge";
import useAxios from "@/context/useAxios";

export default function Schedule({ params }) {
  const [date, setDate] = React.useState();

  const rawCode = params.slug;
  const code = params.slug.match(/.{1,3}/g) || [];
  if (code.length !== 3 || code.some(part => part.length !== 3 || !/^[a-zA-Z0-9]+$/.test(part))) {
    return <div>Invalid code format</div>;
  }

  const { loading, error, fetchApi } = useAxios();
  const [interview, setInterview] = React.useState({});

  React.useEffect(() => {
    const apiParams = {
      url: `/interview/detail/${rawCode}/`,
      method: "GET",
    };
    fetchApi(apiParams).then((res) => {
      if (res.status === 200) {
        setInterview(res.data);
      }
    });
  }, []);

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

  if (error?.response?.status === 404) return <div>Interview not found</div>;

  return (
    <>
      <HeaderMain />
      <main className="flex flex-col space-y-8 items-center justify-center h-screen">
        {interview && <Card className="mx-auto w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <CalendarClock /> Reschedule Interview
            </CardTitle>
            <CardDescription>
              Interview at your convenience. Pick a date and will send you the
              magic link.
            </CardDescription>
            <Card className="bg-accent">
              <CardHeader>
                <CardTitle>{interview.company_name} | {interview.interview_type} Round</CardTitle>
                <CardDescription>
                  {interview.job_title} <br /> Date: 15, August 2024 |
                  Time: 02:34 PM
                  <p className="text-sm font-semibold my-2 gap-1 flex items-center rounded-md">
                    Interview ID:
                    <Badge>{code.map((block, index) => {
                      if (index === 2) return <span key={index} className="text-xs">{block}</span>
                      return <span key={index} className="text-xs">{block}-</span>
                    })}</Badge>
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <DateTimePicker />
              <RadioGroup defaultValue="tech">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tech" id="r2" />
                  <Label htmlFor="r2">Tech/Coding Round</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hr" id="r1" />
                  <Label htmlFor="r1">HR Round</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mr" id="r3" />
                  <Label htmlFor="r3">MR Round</Label>
                </div>
              </RadioGroup>
              <Dialog>
                <DialogTrigger>
                  <Link href="#" onClick={handleClick}>
                    <Button className="w-full gap-2">
                      <TicketPlus />
                      Reschedule
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
                      Your Interview has been rescheduled. We will send you the
                      magic link with all the details.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>}
      </main>
    </>
  );
}
