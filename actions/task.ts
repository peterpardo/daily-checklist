'use server';

import prisma from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCollection(values: { name: string }) {
  try {
    const user = await currentUser();

    await prisma.collection.create({
      data: {
        name: values.name,
        userId: user?.id as string,
      },
    });
  } catch (error) {
    throw new Error('Failed to create collection');
  }

  revalidatePath('/home');
}

export async function editCollection(
  values: { name: string },
  collectionId: number | undefined,
) {
  try {
    await prisma.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        name: values.name,
      },
    });
  } catch (error) {
    throw new Error('Failed to edit collection');
  }

  revalidatePath(`/home/${collectionId}`);
}

export async function deleteCollection(collectionId: number | undefined) {
  try {
    const user = await currentUser();

    await prisma.collection.delete({
      where: {
        id: collectionId,
        userId: user?.id,
      },
    });
  } catch (error) {
    throw new Error('Failed to delete collection');
  }

  revalidatePath('/home');
  redirect('/home');
}
