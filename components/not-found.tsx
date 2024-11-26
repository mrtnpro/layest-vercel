import Link from "next/link";

import { Button } from "./ui/button";

export default function NotFound() {
  return (
    <div className="grid gap-4">
      <h2>This page doesn&apos;t exist</h2>

      <nav className="flex gap-4">
        <Button variant="outline" asChild>
          <Link href="/dashboard">Take me home</Link>
        </Button>
      </nav>
    </div>
  );
}
