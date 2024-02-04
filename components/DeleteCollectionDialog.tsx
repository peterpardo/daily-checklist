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
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Trash } from 'lucide-react';
import React, { Ref } from 'react';

export default React.forwardRef(function DeleteCollectionDialog(
  props,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <AlertDialog>
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
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});
