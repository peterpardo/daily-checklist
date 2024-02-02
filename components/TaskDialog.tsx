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
import { Task } from '@/types';
import { Pencil, Plus } from 'lucide-react';
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

type TaskDialogProps = {
  action?: 'CREATE' | 'EDIT';
  data?: Task | null;
};

const formSchema = z.object({
  title: z.string().min(2).max(30),
  description: z.string().min(2).max(50),
});

export default function TaskDialog({
  action = 'CREATE',
  data = null,
}: TaskDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title ?? '',
      description: data?.description ?? '',
    },
  });
  const isCreate = action === 'CREATE';

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog onOpenChange={(_) => form.reset()}>
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
              <Button type="submit">{isCreate ? 'Add' : 'Edit'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
