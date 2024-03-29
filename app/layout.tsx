import type { Metadata } from 'next';
import { ClerkProvider, currentUser } from '@clerk/nextjs';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import prisma from '@/lib/db';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'DailyChecklist',
  description:
    'DailyChecklist is a todo list app that allows you to manage your task each day making sure that you complete each and every one of them.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  const userData = await prisma.user.findUnique({
    where: {
      id: user?.id ?? '',
    },
  });

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            `min-h-screen bg-background font-sans antialiased theme-${
              userData?.theme ?? 'zinc'
            }`,
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
