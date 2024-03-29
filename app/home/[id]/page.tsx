import CollectionMenu from '@/components/CollectionMenu';
import TaskDialog from '@/components/TaskDialog';
import TaskList from '@/components/TaskList';
import prisma from '@/lib/db';
import { currentUser } from '@clerk/nextjs';

export default async function CollectionPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await currentUser();
  const collection = await prisma.collection.findUnique({
    where: {
      id: parseInt(params.id),
      userId: user?.id as string,
    },
    include: {
      tasks: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });

  return (
    <div className="space-y-5">
      <div className="flex gap-y-3 items-center justify-between">
        <div className="flex items-center gap-x-3">
          <h1 className="font-bold text-xl md:text-4xl">{collection?.name}</h1>
          <CollectionMenu collectionId={params.id} />
        </div>
        <TaskDialog collectionId={params.id} />
      </div>

      <TaskList data={collection?.tasks} />
    </div>
  );
}
