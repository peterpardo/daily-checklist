import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function PlansPage() {
  return (
    <div className="space-y-5">
      <h1 className="font-bold text-xl md:text-4xl">Plans</h1>

      <div className="flex flex-col gap-y-5 justify-between h-80 lg:flex-row lg:gap-y-0 lg:gap-x-5">
        <div className="flex flex-col items-start justify-between gap-y-5 bg-slate-50 bg-opacity-5 rounded p-5 h-full w-full">
          <div className="space-y-3">
            <h1 className="text-3xl">Free Plan</h1>
            <p className="font-semibold">Free</p>
            <ul className="list-inside space-y-2">
              <li className="flex items-center gap-x-2">
                <CheckCircle2 />
                Create your Collections - Max of 5 collections
              </li>
              <li className="flex items-center gap-x-2">
                <CheckCircle2 />
                Create your own Tasks - Max of 10 tasks per collection
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-end w-full">
            <Button variant="outline" disabled>
              Current Plan
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-y-5 bg-primary bg-opacity-5 rounded p-5 h-full w-full">
          <div className="space-y-3">
            <h1 className="text-3xl">Premium Plan</h1>
            <p className="font-semibold">$2.99 per month</p>
            <p>Including all benefits of the free plan plus:</p>
            <ul className="list-inside space-y-2">
              <li className="flex items-center gap-x-2">
                <CheckCircle2 />
                Can create max of 15 collections
              </li>
              <li className="flex items-center gap-x-2">
                <CheckCircle2 />
                Can create max of 30 task per collection
              </li>
              <li className="flex items-center gap-x-2">
                <CheckCircle2 />
                <span className="font-semibold">Reset tasks</span> feature is
                enabled
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-end w-full">
            <Button variant="outline" asChild>
              <Link href="/home">Select Plan</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
