import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BriefcaseBusiness } from "lucide-react";
import Stepper from "../steps";

export default function JobRole() {
  return (
    <main className="flex flex-col space-y-8 items-center justify-center h-screen">
      <Stepper step={2} />
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap">
            <BriefcaseBusiness /> Job Description
          </CardTitle>
          <CardDescription>
            Tell us the job description of the vacancy you are appling. This
            will help us to tailor personalized questions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid w-full gap-2">
              <Input type="text" placeholder="Company Name" />
              <Textarea
                className="h-48"
                placeholder="Paste your job description here"
              />
              <Link href="/onboarding/schedule">
                <Button className="w-full">Next</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
