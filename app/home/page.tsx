import CollectionDialog from '@/components/CollectionDialog';
import HomeCard from '@/components/HomeCard';

export default function HomePage() {
  return (
    <div className="space-y-5">
      <div className="flex gap-y-3 items-center justify-between">
        <h1 className="font-bold text-2xl md:text-4xl">Your Space</h1>
        <CollectionDialog />
      </div>

      <p className="text-xs max-w-[50rem] md:text-sm">
        Welcome to your central hub for productivity! Explore and manage all
        your todo lists in one place.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
        <HomeCard />
        <HomeCard />
        <HomeCard />
      </div>
    </div>
  );
}
