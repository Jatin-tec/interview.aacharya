"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Command } from "@/components/ui/command";
import { ChevronDown, CodeXml } from "lucide-react";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false },
);

const supportedLanguages = [
  "c",
  "cpp",
  "python",
  "java",
  "javascript",
  "go",
  "ruby",
  "arduino",
  "bash",
  "basic",
  "clike",
  "csharp",
  "css",
  "diff",
  "ini",
  "json",
  "kotlin",
  "less",
  "lua",
  "makefile",
  "markdown",
  "markup",
  "markup-templating",
  "objectivec",
  "perl",
  "php",
  "r",
  "regex",
  "rust",
  "sass",
  "scss",
  "sql",
  "swift",
  "typescript",
  "vbnet",
  "yaml",
];
function CodeBlock() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("cpp");

  useEffect(() => {
    const down = (e) => {
      if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div>
      <Command>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full p-2"
            >
              <CodeXml />
            </Button>
          </SheetTrigger>
          <SheetContent className="min-w-[600px]" side="left">
            <SheetHeader className="border-b mb-2 pb-2">
              <SheetTitle>Coding Arena</SheetTitle>
            </SheetHeader>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">
                  Language :
                  <strong className="uppercase mx-1">{language}</strong>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-48 overflow-y-scroll">
                {supportedLanguages.map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => setLanguage(lang)}
                  >
                    {lang}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="h-[85%] bg-accent mt-2 mb-2 overflow-y-scroll border rounded-lg">
              <CodeEditor
                className="p-2"
                value={code}
                language={language}
                placeholder={`Please enter ${language} code.`}
                onChange={(evn) => setCode(evn.target.value)}
                padding={15}
                style={{
                  fontSize: 16,
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                }}
              />
            </div>
            <Button>Submit</Button>
            <div className="resize-handle cursor-ew-resize absolute right-0 top-0 bottom-0 w-2" />
          </SheetContent>
        </Sheet>
      </Command>
    </div>
  );
}

export default CodeBlock;
