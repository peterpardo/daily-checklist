import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CollectionWithTasks } from '@/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type CollectionCardProps = {
  collection: CollectionWithTasks;
};

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={`/home/${collection.id}`}>
      <Card className="transition cursor-pointer hover:bg-accent">
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>{collection.name}</CardTitle>
            <CardDescription>Tasks ({collection.tasks.length})</CardDescription>
          </CardHeader>

          <div className="p-6">
            <ArrowRight />
          </div>
        </div>
      </Card>
    </Link>
  );
}
