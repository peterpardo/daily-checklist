import DeleteCollectionDialog from '@/components/DeleteCollectionDialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil } from 'lucide-react';

export default function CollectionMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem asChild>
          <Button variant="ghost" className="w-full justify-start py-1.5 px-2">
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </Button>
        </DropdownMenuItem>
        <DeleteCollectionDialog />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
