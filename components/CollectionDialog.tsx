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
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { FolderPlus, Loader2, Pencil } from 'lucide-react';
import React, { Ref, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { createCollection, editCollection } from '@/actions/task';
import { Collection } from '@prisma/client';

type CollectionDialogProps = {
  action?: 'CREATE' | 'EDIT';
  data?: Collection | null;
};

const formSchema = z.object({
  name: z.string().min(2).max(20),
});

export default React.forwardRef(function CollectionDialog(
  { action = 'CREATE', data }: CollectionDialogProps,
  ref: Ref<HTMLDivElement>,
) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const isCreate = action === 'CREATE';

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    let toastTitle = '';

    if (action === 'CREATE') {
      await createCollection(values);
      toastTitle = 'Collection successfully created.';
    } else {
      await editCollection(values, data?.id);
      toastTitle = 'Collection successfully edited.';
    }

    toast({
      title: toastTitle,
    });

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
            <FolderPlus size={20} className="mr-2" />
            <span className="text-xs md:text-base">New Collection</span>
          </Button>
        ) : (
          <DropdownMenuItem
            asChild
            ref={ref}
            onSelect={(event) => {
              event.preventDefault();
            }}
          >
            <Button
              variant="ghost"
              className="w-full justify-start py-1.5 px-2 cursor-pointer"
            >
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </Button>
          </DropdownMenuItem>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a Collection</DialogTitle>
          <DialogDescription>
            Simply enter the desired name below and click &quot;Create&quot; to
            kickstart your focused productivity journey!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your collection name here..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {action === 'CREATE'
                  ? isLoading
                    ? 'Creating...'
                    : 'Create'
                  : isLoading
                  ? 'Editing...'
                  : 'Edit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});
