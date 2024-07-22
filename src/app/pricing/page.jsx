import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { HeaderMain } from "@/components/header";
import { Check } from "lucide-react";

export const metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return (
    <>
      <HeaderMain />
      <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-extrabold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Simple, transparent pricing
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Unlock all features including unlimited interviews.
          </p>
        </div>
        <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
          <div className="grid gap-6">
            <h3 className="text-xl font-bold sm:text-2xl">
              What&apos;s included in the plan
            </h3>
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> Unlimited Interviews
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> Unlimited Rescheduling
              </li>

              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> Personalized Interview
                Experience
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> Dashboard Analytics
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> Access to Code Editor
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> Premium Support
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h4 className="text-7xl font-bold">$0</h4>
              <p className="text-sm font-medium text-muted-foreground">
                Billed Monthly
              </p>
            </div>
            <Link
              href="/session"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7 px-1">
            Interview by Aacharya is on beta version.{" "}
            <strong>Some of the features will be forever free.</strong>
          </p>
        </div>
      </section>
    </>
  );
}
