'use client';

import { TaskInputField } from '@/components/TaskForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type TaskInputFieldsProps = {
  item: TaskInputField;
  index: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
};

export default function TaskInputFields({
  item,
  index,
  onChange,
}: TaskInputFieldsProps) {
  return (
    <div className="flex flex-col items-end justify-between gap-y-3 py-5">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="Task title here..."
          value={item.title.value}
          onChange={(event) => onChange(event, index)}
        />
        <span className="text-red-600">{item.title.error}</span>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="description">
          Description
          <span className="text-slate-400 dark:text-slate-300">
            {' '}
            (Optional)
          </span>
        </Label>
        <Input
          type="text"
          id="description"
          title="description"
          name="description"
          placeholder="Task description here..."
          value={item.description.value}
          onChange={(event) => onChange(event, index)}
        />
        <span className="text-red-600">{item.description.error}</span>
      </div>
    </div>
  );
}
