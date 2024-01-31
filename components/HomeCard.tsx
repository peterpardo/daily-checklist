import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomeCard() {
  return (
    <Link href={`/home/1`}>
      <Card className="transition cursor-pointer hover:bg-accent">
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>Monday Work</CardTitle>
            <CardDescription>Tasks (6)</CardDescription>
          </CardHeader>

          <div className="p-6">
            <ArrowRight />
          </div>
        </div>
      </Card>
    </Link>
  );
}
