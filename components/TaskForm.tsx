'use client';

import TaskInputFields from '@/components/TaskInputFields';

export default function TaskForm() {
  return (
    <div className="max-w-[40rem] divide-y-2">
      <TaskInputFields showAddButton={false} />
      <TaskInputFields showAddButton={false} />
      <TaskInputFields showAddButton={true} />
    </div>
  );
}
