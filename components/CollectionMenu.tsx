import CollectionDialog from '@/components/CollectionDialog';
import DeleteCollectionDialog from '@/components/DeleteCollectionDialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import prisma from '@/lib/db';
import { MoreHorizontal } from 'lucide-react';

type CollectionMenuProps = {
  collectionId: string;
};

export default async function CollectionMenu({
  collectionId,
}: CollectionMenuProps) {
  const collection = await prisma.collection.findUnique({
    where: {
      id: parseInt(collectionId),
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <CollectionDialog action="EDIT" data={collection} />
        <DeleteCollectionDialog data={collection} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
