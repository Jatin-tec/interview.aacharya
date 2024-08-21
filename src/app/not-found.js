import Link from "next/link";
import Image from "next/image";
import { HeaderMain } from "@/components/header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-white h-screen">
      <HeaderMain />
      <div className="flex-col flex items-center justify-center bg-white dark:bg-white dark:text-black">
        <Image
          src="/dribbble_1.gif"
          alt="404"
          width={600}
          height={400}
          draggable="false"
        />
        <h2 className="text-3xl font-bold">404 Not Found</h2>
        <p>Uh Oh! Seems you reach wrong place.</p>
        <Button className="mt-4 dark:border-2 dark:border-black">
          <Link href="/session">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
