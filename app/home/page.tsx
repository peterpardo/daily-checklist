import AddCollectionDialog from '@/components/AddCollectionDialog';
import HomeCard from '@/components/HomeCard';

export default function HomePage() {
  return (
    <div className="space-y-5">
      <div className="flex gap-y-3 items-center justify-between">
        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">Your Space</h1>
        <AddCollectionDialog />
      </div>

      <p className="text-xs max-w-[50rem] md:text-sm">
        Welcome to your central hub for productivity! Explore and manage all
        your todo lists in one place. This page displays the names of your task
        lists, providing a quick overview of your organized commitments.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
        <HomeCard />
        <HomeCard />
        <HomeCard />
      </div>
    </div>
  );
}
