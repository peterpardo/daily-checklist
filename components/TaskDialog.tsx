'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Loader2, Pencil, Plus } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { Task } from '@prisma/client';
import { createTask, editTask } from '@/actions/tasks';

type TaskDialogProps = {
  action?: 'CREATE' | 'EDIT';
  data?: Task | null;
  collectionId?: string;
};

const formSchema = z.object({
  title: z.string().min(2).max(30),
  description: z.string().max(50),
});

export default function TaskDialog({
  action = 'CREATE',
  data = null,
  collectionId,
}: TaskDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title ?? '',
      description: data?.description ?? '',
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const isCreate = action === 'CREATE';

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    let toastTitle = '';

    if (action === 'CREATE') {
      await createTask(values, collectionId);
      toastTitle = 'Task successfully created.';
    } else {
      await editTask(values, data?.id);
      toastTitle = 'Task successfully edited.';
    }

    toast({
      title: toastTitle,
    });
    form.reset();
    setIsOpen(false);
    setIsLoading(false);
  }

  function handleDialogChange(open: boolean) {
    if (!open) {
      form.reset();
    }
    setIsOpen(open);
  }

  return (
    <Dialog onOpenChange={handleDialogChange} open={isOpen}>
      <DialogTrigger asChild>
        {isCreate ? (
          <Button variant="secondary">
            <Plus size={20} className="mr-2" />
            <span className="text-xs md:text-base">Add Task</span>
          </Button>
        ) : (
          <Button variant="ghost" size="icon">
            <Pencil size={16} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isCreate ? 'Create a Task' : 'Edit Task'}</DialogTitle>
          <DialogDescription>
            {isCreate
              ? 'Type in the title of your task and you can add description if you want.'
              : 'Make an update on the task that you selected.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title here..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter task description here..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isCreate ? 'Add' : 'Edit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
