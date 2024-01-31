'use client';

import { navItems } from '@/app/home/_constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useClerk, useUser } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
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
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.hasImage ? user.imageUrl : ''} />
          <AvatarFallback>{avatarFallbackText}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          {navItems.map((item, i) => (
            <DropdownMenuItem asChild key={i}>
              <Link href={item.link} className="cursor-pointer">
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut(() => router.push('/'))}
          className="cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
