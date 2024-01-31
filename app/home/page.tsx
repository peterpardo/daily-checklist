'use client';

import { navItems } from '@/app/home/_constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Home() {
  const path = usePathname();
  // add active link
  console.log(path);

  return (
    <div className="container flex items-start gap-x-5 py-5">
      <div className="w-60 h-[90vh] flex flex-col gap-y-2">
        {navItems.map((item, i) => (
          <Link
            key={i}
            href={item.link}
            className="flex items-center gap-x-2 text-sm w-full px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground"
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
      <div>main content</div>
    </div>
  );
}
