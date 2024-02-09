'use client';

import { Separator } from '@/components/ui/separator';
import TaskCard from '@/components/TaskCard';
import { useEffect, useMemo, useState } from 'react';
import { Task } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { editTaskStatus } from '@/actions/tasks';

type TaskListProps = {
  data: Task[] | undefined;
};

export default function TaskList({ data }: TaskListProps) {
  const [tasks, setTasks] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const completedTasks = useMemo(
    () => tasks?.filter((task) => task.completed),
    [tasks],
  );
  const notCompletedTasks = useMemo(
    () => tasks?.filter((task) => !task.completed),
    [tasks],
  );

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const handleTaskStatusChange = async (value: boolean, id: number) => {
    setIsLoading(true);
    await editTaskStatus(value, id);
    setIsLoading(false);
  };

  return (
    <div className="relative max-w-[40rem] space-y-5">
      <div className="mt-3 space-y-3">
        <h1 className="text-lg font-semibold md:text-3xl">To do</h1>
        <Separator />
        {notCompletedTasks && notCompletedTasks?.length > 0 ? (
          notCompletedTasks?.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onChange={handleTaskStatusChange}
            />
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
        {completedTasks && completedTasks?.length > 0 ? (
          completedTasks?.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onChange={handleTaskStatusChange}
            />
          ))
        ) : (
          <div className="text-center mt-3">
            <p>No completed tasks yet</p>
          </div>
        )}
      </div>

      {/* Loading screen when updating task status */}
      {isLoading && (
        <div className="absolute backdrop-blur-sm bg-white/30 -top-5 left-0 w-full h-full grid place-content-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  );
}
