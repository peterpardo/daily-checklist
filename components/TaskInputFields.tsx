import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

type TaskInputFieldsProps = {
  showAddButton: boolean;
};

export default function TaskInputFields({
  showAddButton,
}: TaskInputFieldsProps) {
  return (
    <div className="flex flex-col items-end justify-between gap-y-2 py-5">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input type="title" id="title" placeholder="Title" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="description">
          Description
          <span className="text-slate-400 dark:text-slate-300">
            {' '}
            (Optional)
          </span>
        </Label>
        <Input type="description" id="description" placeholder="Description" />
      </div>
      {showAddButton ? (
        <div className="w-full">
          <Button size="icon" className="w-full">
            <Plus size={30} />
          </Button>
        </div>
      ) : (
        <div className="w-20"></div>
      )}
    </div>
  );
}
