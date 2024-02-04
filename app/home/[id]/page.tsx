import CollectionMenu from '@/components/CollectionMenu';
import TaskDialog from '@/components/TaskDialog';
import TaskList from '@/components/TaskList';
import taskData from '@/tasksData.json';

export default function CollectionPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-5">
      <div className="flex gap-y-3 items-center justify-between">
        <div className='flex items-center gap-x-3'>
          <h1 className="font-bold text-xl md:text-4xl">Monday Tasks</h1>
          <CollectionMenu />
        </div>
        <TaskDialog />
      </div>

      <TaskList data={taskData} />
    </div>
  );
}
