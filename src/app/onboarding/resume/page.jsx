import Link from "next/link";

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
import { FileText } from "lucide-react";
import Stepper from "../steps";
import { HeaderMain } from "@/components/header";

export default function Resume() {
  return (
    <div>
      <HeaderMain />
      <main className="flex flex-col space-y-8 items-center justify-center h-screen">
        <Stepper step={1} />
        <Card className="mx-auto w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap">
              <FileText /> Upload Resume/CV
            </CardTitle>
            <CardDescription>
              For personalizing your experience we need your resume, don't worry
              we will keep it safe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="picture">Resume</Label>
                <Input id="picture" type="file" className="cursor-pointer" />
              </div>
              <Link href="/onboarding/jobrole">
                <Button className="w-full gap-4">Next</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
