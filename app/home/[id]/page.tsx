import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Pencil, Trash2 } from 'lucide-react';

export default function CollectionPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-5">
      <div className="flex gap-y-3 items-center justify-between">
        <h1 className="font-bold text-xl md:text-4xl">Monday Tasks</h1>
      </div>

      <div className="max-w-[40rem] space-y-5">
        <div>
          <h1 className="text-lg font-semibold md:text-3xl">To do</h1>
          <Separator />
        </div>

        <div className="mt-3 space-y-3">
          <Card>
            <div className="flex items-start p-2">
              <div className="pl-2 pr-2 pt-3">
                <Checkbox />
              </div>
              <CardHeader className="p-2">
                <CardTitle className="text-lg">Card Title</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                </CardDescription>
              </CardHeader>

              <div className="flex items-center ml-auto mt-1">
                <div className="hover:bg-accent p-2 rounded cursor-pointer">
                  <Pencil size={20} />
                </div>
                <div className="hover:bg-accent p-2 rounded cursor-pointer">
                  <Trash2 size={20} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <h1 className="text-lg font-semibold md:text-3xl">Completed</h1>
          <Separator />
          <div className="text-center mt-3">
            <p>No completed tasks yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
