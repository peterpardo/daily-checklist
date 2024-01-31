import SidebarMenu from '@/components/SidebarMenu';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container flex flex-col gap-y-5 items-start py-5 md:flex-row md:gap-x-5 md:gap-y-0">
      <SidebarMenu />
      <div className="w-full">{children}</div>
    </div>
  );
}
