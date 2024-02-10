import SettingsForm from '@/components/SettingsForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { currentUser } from '@clerk/nextjs';
import prisma from '@/lib/db';

export default async function SettingsPage() {
  const user = await currentUser();
  const userData = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  const emailData = user?.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId,
  );

  return (
    <div className="space-y-5">
      <div className="flex gap-y-3 items-center justify-between">
        <h1 className="font-bold text-2xl md:text-4xl">Settings</h1>
      </div>

      <p className="text-xs max-w-[50rem] md:text-sm">
        Manage your account details here. You can also change the theme of your
        account.
      </p>

      <div className="max-w-[40rem] space-y-5">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Email"
            disabled
            value={emailData?.emailAddress ?? ''}
            className="mt-1.5"
          />
        </div>

        <SettingsForm data={userData} />
      </div>
    </div>
  );
}
