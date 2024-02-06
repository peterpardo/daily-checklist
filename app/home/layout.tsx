import SidebarMenu from '@/components/SidebarMenu';
import { getUser } from '@/utils';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  await getUser(user);

  return (
    <div className="container flex flex-col gap-y-5 items-start py-5 md:flex-row md:gap-x-5 md:gap-y-0">
      <SidebarMenu />
      <div className="w-full">{children}</div>
    </div>
  );
}
