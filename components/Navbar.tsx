import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';

import { ThemeToggle } from '@/components/ThemeToggle';
import NavbarMenu from '@/components/NavbarMenu';
import { buttonVariants } from '@/components/ui/button';

export default async function Navbar() {
  const user = await currentUser();

  return (
    <nav className="w-full border-b px-2 py-4">
      <div className="container flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          DailyChecklist
        </Link>
        <div className="flex items-center gap-x-5">
          <ThemeToggle />
          {user ? (
            <NavbarMenu />
          ) : (
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: 'default' })}
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
