'use client'
import { DataTableDemo } from "./Table"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function Recent() {
    return (
        <main className="flex items-center justify-center h-screen">
          <Card className="mx-auto w-full max-w-4xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                Recent Interviews
              </CardTitle>
              <CardDescription>
                Here are your recent Interviews.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTableDemo />
            </CardContent>
          </Card>
        </main>
      );
}