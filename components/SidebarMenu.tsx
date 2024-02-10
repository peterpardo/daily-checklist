'use client';

import { navItems } from '@/app/home/_constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function SidebarMenu() {
  const path = usePathname();

  return (
    <aside className="hidden w-60 h-[90vh] flex-col gap-y-2 md:flex">
      {navItems.map((item, i) => (
        <Link
          key={i}
          href={item.link}
          className={`flex items-center gap-x-2 text-sm w-full px-4 py-2 rounded font-semibold hover:bg-accent hover:text-accent-foreground ${
            path === item.link ? 'bg-accent' : ''
          }  `}
        >
          <item.icon size={18} className="text-primary" />
          <span>{item.name}</span>
        </Link>
      ))}
    </aside>
  );
}
