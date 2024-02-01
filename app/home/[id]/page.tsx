import { Separator } from '@/components/ui/separator';
import TaskCard from '@/components/TaskCard';
import taskData from '@/tasksData.json';

export default function CollectionPage({ params }: { params: { id: string } }) {
  const completedTasks = taskData.filter((task) => task.completed);
  const notCompletedTasks = taskData.filter((task) => !task.completed);

  return (
    <div className="space-y-5">
      <div className="flex gap-y-3 items-center justify-between">
        <h1 className="font-bold text-xl md:text-4xl">Monday Tasks</h1>
      </div>

      <div className="max-w-[40rem] space-y-5">
        <div className="mt-3 space-y-3">
          <h1 className="text-lg font-semibold md:text-3xl">To do</h1>
          <Separator />
          {notCompletedTasks.length > 0 ? (
            notCompletedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <div className="text-center mt-3">
              <p>Task list is empty</p>
            </div>
          )}
        </div>

        <div className="mt-3 space-y-3">
          <h1 className="text-lg font-semibold md:text-3xl">Completed</h1>
          <Separator />
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <div className="text-center mt-3">
              <p>No completed tasks yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
