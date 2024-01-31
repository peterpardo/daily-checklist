'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function NavbarMenu() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  let avatarFallbackText = 'U';

  if (user && user?.firstName && user?.lastName) {
    avatarFallbackText = (
      user?.firstName.charAt(0) + user.lastName.charAt(0)
    ).toUpperCase();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.hasImage ? user.imageUrl : ''} />
          <AvatarFallback>{avatarFallbackText}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => signOut(() => router.push('/'))}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
