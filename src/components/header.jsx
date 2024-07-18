"use client";
import {
  Package2,
  MessageSquareWarning,
  Settings,
  MoonIcon,
  SunIcon,
  CircleUser,
  LogOut,
  Mic,
  Speaker,
  Camera,
} from "lucide-react";
import Link from "next/link";
import CurrentDateTime from "./current-time";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "./ui/textarea";

export function HeaderMain() {
  const { setTheme } = useTheme();

  return (
    <div className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/session"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="">Interview</span>
        </Link>
      </nav>
      <div className="flex flex-1 sm:flex-initial justify-end items-center gap-2 md:ml-auto md:gap-2 lg:gap-4">
        <CurrentDateTime />
        <Button className="h-[28px]">
          <Link href="/auth">Login</Link>
        </Button>

        {/* Feedback Report Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full ml-auto flex-1 sm:flex-initial"
            >
              <MessageSquareWarning className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Report Bug and Feedback</SheetTitle>
              <SheetDescription>
                Found a bug or have feedback? Let us know so we can improve.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" placeholder="Jatin Kshatriya" className="" />
              </div>
              <div className="items-center gap-4">
                <Label htmlFor="feedback" className="text-right">
                  Feedback
                </Label>
                <Textarea
                  id="feedback"
                  placeholder="Your feedback here."
                  className="h-40"
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Send</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Test Mic/Cam Settings */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full ml-auto flex-1 sm:flex-initial"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
              <DialogDescription>
                Please allow audio and video permissions to start the interview.
                Also check the camera and microphone settings before starting.
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="audio" className="h-[200px]">
              <TabsList>
                <TabsTrigger value="audio">Audio</TabsTrigger>
                <TabsTrigger value="video">Video</TabsTrigger>
              </TabsList>
              <TabsContent value="audio">
                <Label
                  className="m-1 flex items-center text-sm text-muted-foreground"
                  htmlFor="mic"
                >
                  <Mic className="w-4 h-4" /> Microphone
                </Label>
                <Select id="mic">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Microphone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m1">Built-in Audio</SelectItem>
                    <SelectItem value="m2">Monitor Audio</SelectItem>
                  </SelectContent>
                </Select>

                <Label
                  className="m-1 flex items-center text-sm mt-2 text-muted-foreground"
                  htmlFor="speaker"
                >
                  <Speaker className="h-4 w-4" /> Speaker
                </Label>
                <div className="grid grid-cols-2 items-center gap-5">
                  <Select id="speaker">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Speaker" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="s11">Built-in Speaker</SelectItem>
                      <SelectItem value="s2">Headphone</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="secondary" className="w-fit rounded-full">
                    Test
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="video">
                <Label
                  className="m-1 flex items-center text-sm text-muted-foreground"
                  htmlFor="cam"
                >
                  <Camera className="w-4 h-4 mr-1" /> Camera
                </Label>
                <Select id="cam">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Camera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="c1">Built-in Camera</SelectItem>
                    <SelectItem value="c2">Wifi Camera</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center justify-center text-xs mt-4 w-28 h-20 rounded-md bg-zinc-800 animate-pulse">
                  Video
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Theme Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full ml-auto"
            >
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full ml-auto"
            >
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile/recent">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/profile/recent">Recent</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/profile/report">AI Report</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="w-4 h-4 mx-1" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
