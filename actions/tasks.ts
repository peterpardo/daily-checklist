'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createTask(
  values: {
    title: string;
    description?: string;
  },
  collectionId: string | undefined,
) {
  try {
    if (!collectionId) throw new Error('Collection does not exists.');

    await prisma.task.create({
      data: {
        title: values.title,
        description: values.description,
        collectionId: parseInt(collectionId),
      },
    });
  } catch (error) {
    throw new Error('Failed to create task.');
  }

  revalidatePath(`/home/${collectionId}`);
}
