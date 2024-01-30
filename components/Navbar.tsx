import { ThemeToggle } from '@/components/ThemeToggle';
import { buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { currentUser } from '@clerk/nextjs';

import Link from 'next/link';

export default async function Navbar() {
  const user = await currentUser();
  let avatarFallbackText = 'U';
  if (user && user?.firstName && user?.lastName) {
    avatarFallbackText = (
      user?.firstName.charAt(0) + user.lastName.charAt(0)
    ).toUpperCase();
  }

  return (
    <nav className="w-full border-b px-2 py-4">
      <div className="container flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          DailyChecklist
        </Link>
        <div className="flex items-center gap-x-5">
          <ThemeToggle />
          {user ? (
            <Avatar>
              <AvatarImage src={user.hasImage ? user.imageUrl : ''} />
              <AvatarFallback>{avatarFallbackText}</AvatarFallback>
            </Avatar>
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
