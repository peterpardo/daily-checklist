import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="w-full border-b px-2 py-4">
      <div className="container flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          DailyChecklist
        </Link>
        <div className="flex items-center gap-x-2">
          <ThemeToggle />
          <Button>Sign in</Button>
        </div>
      </div>
    </nav>
  );
}
