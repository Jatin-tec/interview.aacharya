import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Sparkles,
  Star,
  Users,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HeaderMain } from "@/components/header";

export default function Dashboard() {
  return (
    <div className="flex h-screen min-h-screen w-full flex-col">
      <HeaderMain />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="w-full">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex gap-1.5 text-sm font-semibold text-muted-foreground">
                <Sparkles className="h-4 w-4 text-muted-foreground" /> AI Report
                Generated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">
                Interview for <b>Google</b>
              </div>
              <div className="flex gap-2 items-center mt-2">
                <Badge variant="outline">Tech/Coding Round</Badge>
                <p className="text-xs text-muted-foreground">
                  Date: 12th August 2021 Time: 10:00 AM
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Acceptance Rate
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="flex gap-1 items-center text-2xl font-bold">
                  8<Star className="fill-current" />
                </div>
                <p className="text-md font-bold text-muted-foreground">/10</p>
              </div>
              <p className="text-xs text-muted-foreground">
                You have strong chances of getting selected
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Correctness Rate
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <p className="text-2xl font-bold">79</p>
                <p className="text-md font-bold text-muted-foreground">/100</p>
              </div>
              <p className="text-xs text-muted-foreground">
                You are doing great, keep it up!
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Answer Time
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">13:43 min</div>
              <p className="text-xs text-muted-foreground">
                You were quick with your answers!
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Communication
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Fluent</div>
              <p className="text-xs text-muted-foreground">
                You were fluent with your answers!
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="h-full grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row justify-between items-center">
              <div className="grid gap-2">
                <CardTitle>Questions and Feedback</CardTitle>
                <CardDescription>
                  Detailed feedback on each question!
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button asChild size="icon" className="ml-auto gap-1">
                  <Link href="#">
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="icon" className="ml-auto gap-1">
                  <Link href="#">
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="question">
                <TabsList>
                  <TabsTrigger value="question">Question</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                  <TabsTrigger value="answer">AI Answer</TabsTrigger>
                </TabsList>
                <TabsContent value="question">
                  <div className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla a nunc. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Nulla a nunc. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Nulla a nunc.
                  </div>
                </TabsContent>
                <TabsContent value="feedback">
                  <div className="text-sm text-muted-foreground">
                    Change your password here.
                  </div>
                </TabsContent>
                <TabsContent value="answer">
                  <div className="text-sm text-muted-foreground">
                    I’ve always been a fan of X Co’s products and I’ve spent
                    countless hours playing your games. I know that your focus
                    on unique stories is what drew me and other fans into your
                    games initially and keeps us coming back for more. I’ve
                    followed X Co on social media for a while, and I’ve always
                    loved how you have people in different departments interact
                    with users. So I was psyched when I came across this posting
                    for a social media manager with TikTok experience. At my
                    last job, I was responsible for launching our TikTok account
                    and growing it to 10,000 followers in six months. Between
                    that experience, my love of gaming, and my deep knowledge of
                    your games and fanbase, I know I could make this TikTok
                    account something special and exciting.
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Overall Feedback</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>HR</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Harshal Rathore
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Senior Software Engineer @ Google
                  </p>
                </div>
                <div className="ml-auto font-medium">3+ YOE</div>
              </div>
              <div className="text-sm text-muted-foreground">
                Before your resume reaches the hands of a hiring manager, it
                often must satisfy an ATS — applicant tracking system. An ATS is
                a type of software used by recruiters and employers to collect,
                sort, scan, and rank the job applications they receive for open
                positions. If a resume is not written with an ATS in mind, a
                qualified candidate can be easily passed over. Upload your
                resume for free and find out what an applicant tracking system
                will think. Your dream job could depend on it.
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
