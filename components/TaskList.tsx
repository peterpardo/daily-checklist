'use client';

import { Separator } from '@/components/ui/separator';
import TaskCard from '@/components/TaskCard';
import { useMemo, useState } from 'react';
import { Task } from '@prisma/client';

type TaskListProps = {
  data: Task[] | undefined;
};

export default function TaskList({ data }: TaskListProps) {
  const [tasks, setTasks] = useState(data);
  const completedTasks = useMemo(
    () => tasks?.filter((task) => task.completed),
    [tasks],
  );
  const notCompletedTasks = useMemo(
    () => tasks?.filter((task) => !task.completed),
    [tasks],
  );

  const handleTaskStatusChange = (value: boolean, id: number) => {
    const currentTasks = [...(tasks || [])];
    const updatedTask = currentTasks.find((task) => task.id === id);
    const oldTasks = currentTasks.filter((task) => task.id !== id);

    if (!updatedTask) return;

    updatedTask.completed = value;

    const newTasks = [...oldTasks, updatedTask];

    setTasks([...newTasks]);
  };

  return (
    <div className="max-w-[40rem] space-y-5">
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
    </div>
  );
}
