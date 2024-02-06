import { Prisma } from '@prisma/client';

export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  collectionId: string;
};

const collectionWithTasks = Prisma.validator<Prisma.CollectionDefaultArgs>()({
  include: { tasks: true },
});

export type CollectionWithTasks = Prisma.CollectionGetPayload<
  typeof collectionWithTasks
>;
