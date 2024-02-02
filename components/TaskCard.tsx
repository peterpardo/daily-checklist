'use client';

import { DeleteTaskDialog } from '@/components/DeleteTaskDialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@/types';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

type TaskCardProps = {
  task: Task;
  onChange: (value: boolean, id: number) => void;
};

export default function TaskCard({ task, onChange }: TaskCardProps) {
  return (
    <Card>
      <div className="flex items-start p-2">
        <div className="pl-2 pr-2 pt-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={(value: boolean) => onChange(value, task.id)}
          />
        </div>
        <CardHeader className="p-2">
          <CardTitle
            className={`text-lg ${task.completed ? 'line-through' : ''}`}
          >
            {task.title}
          </CardTitle>
          <CardDescription
            className={`text-xs md:text-sm  ${
              task.completed ? 'line-through' : ''
            }`}
          >
            {task.description}
          </CardDescription>
        </CardHeader>

        <div className="flex items-center ml-auto mt-1">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/home/1`}>
              <Pencil size={16} />
            </Link>
          </Button>
          <DeleteTaskDialog />
        </div>
      </div>
    </Card>
  );
}
