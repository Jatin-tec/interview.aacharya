"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { HeaderMain } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import { CalendarClock, CirclePlay, CirclePlus } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAxios from "@/context/useAxios";

function SessionJoin() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  );
  const { setTheme } = useTheme();
  const { loading, error, fetchApi } = useAxios();

  const [upcommingInterviews, setUpcommingInterviews] = React.useState([]);


  React.useEffect(() => {
    const apiParams = {
      url: "/interview/schedule/",
      method: "GET",
    }
    fetchApi(apiParams).then((res) => {
      if (res.status === 200) {
        setUpcommingInterviews(res.data)
      }
    })
  }, []);


  return (
    <div className="h-screen w-full">
      <HeaderMain />
      <main className="grid grid-cols-2 md:grid-cols-3 items-center h-[90%] px-20">
        <div className="flex flex-col col-span-2 items-start justify-start gap-2">
          <h1 className="text-3xl font-bold text-center">
            Interviews for everyone at your convinience.
          </h1>
          <p className="text-lg text-center">
            Personalized Interview experience curated for you!
          </p>
          <div className="flex flex-row items-center gap-2 mt-8">
            <Button>
              <Link className="flex gap-1.5 items-center" href="/onboarding">
                <CirclePlus /> New Interview
              </Link>
            </Button>
            <p className="mx-2">or</p>
            <InputOTP maxLength={9} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={6} />
                <InputOTPSlot index={7} />
                <InputOTPSlot index={8} />
              </InputOTPGroup>
            </InputOTP>
            <Button>
              <Link href="/session/tech">Join</Link>
            </Button>
          </div>
          <Separator className="w-[70%] mt-6 mb-4" />
          <span className="text-xl font-bold">Upcoming Interviews</span>
          <Carousel>
            <CarouselContent>
              {upcommingInterviews && upcommingInterviews.map((interview) => (
                <CarouselItem>
                  <Card className="bg-accent">
                    <CardHeader>
                      <CardTitle>{interview.company_name} | {interview.interview_type} Round</CardTitle>
                      <CardDescription>
                        {interview.job_title}
                        <p className="text-sm font-semibold my-2 rounded-md">
                          Date: 15, August 2024 | Time: 02:34 PM
                        </p>
                        <div className="flex gap-2">
                          <Button className="w-1/2">
                            <CirclePlay className="w-4 h-4 mr-1" />
                            Start
                          </Button>
                          <Button className="w-1/2" variant="outline">
                            <CalendarClock className="w-4 h-4 mr-1" /> Reshedule
                          </Button>
                        </div>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <p className="text-sm">
            Learn more about{" "}
            <Link className="underline text-slate-600" href="#">
              Aacharya Interview
            </Link>
          </p>
        </div>
        <div className="justify-center flex flex-col col-span-1">
          <iframe
            className="h-60 dark:bg-transparent"
            src="https://lottie.host/embed/30a8c054-62b2-4f2d-99a6-24c0eeef8b08/EOzWQUPW9R.json"
          />
          <Carousel
            plugins={[plugin.current]}
            className="text-center font-bold bg-black text-white dark:bg-white dark:text-black p-4 rounded-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              <CarouselItem>
                Personalized Interview experience curated for you!
              </CarouselItem>
              <CarouselItem> Schedule you interview anytime! </CarouselItem>
              <CarouselItem> Real envioronment curated for you! </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </main>
    </div>
  );
}

export default SessionJoin