import CollectionDialog from '@/components/CollectionDialog';
import DeleteCollectionDialog from '@/components/DeleteCollectionDialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

export default function CollectionMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <CollectionDialog action="EDIT" data="collection name" />
        <DeleteCollectionDialog />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
