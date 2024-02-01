import TaskForm from '@/components/TaskForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function AddTaskPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-5">
      <div className="flex gap-x-2 items-center">
        <Button variant="ghost" asChild size="icon">
          <Link href={`/home/${params.id}`}>
            <ArrowLeft size={20} />
          </Link>
        </Button>
        <h1 className="font-bold text-xl md:text-4xl">Add Task</h1>
      </div>

      <TaskForm />
    </div>
  );
}
