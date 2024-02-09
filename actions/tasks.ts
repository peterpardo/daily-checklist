'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

type TaskData = {
  title: string;
  description?: string;
};

export async function createTask(
  values: TaskData,
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

export async function editTask(values: TaskData, taskId: number | undefined) {
  let collectionId: number | null = null;

  try {
    if (!taskId) throw new Error('Task does not exists.');

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title: values.title,
        description: values.description,
      },
    });

    collectionId = updatedTask.collectionId;
  } catch (error) {
    throw new Error('Failed to edit task.');
  }

  revalidatePath(`/home/${collectionId}`);
}

export async function editTaskStatus(
  status: boolean,
  taskId: number | undefined,
) {
  let collectionId: number | null = null;

  try {
    if (!taskId) throw new Error('Task does not exists.');

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        completed: status,
      },
    });

    collectionId = updatedTask.collectionId;
  } catch (error) {
    throw new Error('Failed to edit task status.');
  }

  revalidatePath(`/home/${collectionId}`);
}
