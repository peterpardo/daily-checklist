import { Button } from '@/components/ui/button';
import React from 'react';

export default function BillingPage() {
  return (
    <div className="space-y-5">
      <h1 className="font-bold text-xl md:text-4xl">Subscription</h1>

      <div className="space-y-5 border rounded p-5 bg-slate-50 bg-opacity-5">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Curent Plan</h2>
          <p>
            You are currently on the{' '}
            <span className="font-bold">Free Plan</span>. Click the button below
            to change your plan.
          </p>
          <p>- Free plan</p>
        </div>

        <Button>Change Plan</Button>
      </div>
    </div>
  );
}
