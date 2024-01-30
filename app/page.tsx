import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="grid place-content-center h-[90vh] text-center space-y-10">
        <h1 className="font-bold text-8xl">Daily Checklist</h1>
        <p className="text-xl w-[45rem] text-slate-500 dark:text-slate-300">
          Never worry about forgetting another task again! List all of the
          things you need to accomplish.
        </p>
        <div>
          <Button>Start now</Button>
        </div>
      </div>
    </main>
  );
}
