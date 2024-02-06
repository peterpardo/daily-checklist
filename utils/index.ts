import { User } from '@clerk/nextjs/server';
import prisma from '@/lib/db';

export function getUserEmail(user: User) {
  const email = user?.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId,
  );

  return email?.emailAddress ?? '';
}

export async function getUser(user: User) {
  const data = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!data) {
    const userEmail = getUserEmail(user);

    await prisma.user.create({
      data: {
        id: user.id,
        email: userEmail,
        name: `${user.firstName ?? ''} ${user.lastName ?? ''}`,
      },
    });
  }
}
