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
import { Label } from '@/components/ui/label';
import { FolderPlus } from 'lucide-react';
import React from 'react';

export default function AddCollectionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-x-2 rounded cursor-pointer text-sm py-2 px-4 w-max transition ease-in hover:bg-accent">
          <FolderPlus size={20} />
          New Collection
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a Collection</DialogTitle>
          <DialogDescription>
            Simply enter the desired name below and click &quot;Create&quot; to
            kickstart your focused productivity journey!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="name" className="sr-only">
              Name
            </Label>
            <Input id="name" placeholder="Your collection name here..." />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
