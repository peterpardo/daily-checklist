'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Loader2, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { Ref, useState } from 'react';

export default React.forwardRef(function DeleteCollectionDialog(
  props,
  ref: Ref<HTMLDivElement>,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    setIsLoading(true);

    await (async () => {
      return new Promise((resolve, reject) =>
        setTimeout(() => resolve('resolved'), 1000),
      );
    })();

    toast({
      title: 'Collection successfully deleted.',
    });
    setIsOpen(false);
    setIsLoading(false);
    router.push('/home');
  }

  return (
    <AlertDialog onOpenChange={(open) => setIsOpen(open)} open={isOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          asChild
          ref={ref}
          onSelect={(event) => {
            event.preventDefault();
          }}
        >
          <Button variant="ghost" className="w-full justify-start py-1.5 px-2">
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </Button>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            collection you&apos;ve created.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Deleting...' : 'Continue'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});
