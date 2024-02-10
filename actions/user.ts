'use server';
import { currentUser } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';

export async function updateUserTheme(values: { theme: string }) {
  try {
    const user = await currentUser();

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        theme: values?.theme,
      },
    });
  } catch (error) {
    throw new Error('Failed updating user theme.');
  }

  revalidatePath('/', 'layout');
}
