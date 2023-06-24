import Link from "next/link";
import { getDogs } from "@/app/_actions/dog";
import DogCard, { DogCardProps } from "./dog-card";

export default async function DogsPage() {
  const dogs: DogCardProps[] = await getDogs();
  const imageClass: DogCardProps["imageClass"] = ["w-full", "h-[28rem]"];
  return (
    <main className="min-h-screen px-20 py-10 pb-16">
      <Link
        className="inline-flex items-center rounded-lg mb-4 px-6 py-3 
          hover:outline hover:outline-1 hover:outline-orange-500"
        href="/"
      >
        <span aria-hidden="true" className="mr-4 text-4xl pb-1">
          ←
        </span>
        Back Home
      </Link>
      <div
        className="grid grid-cols-[repeat(3,minmax(500px,1fr))] 
          auto-rows-max gap-9"
      >
        {dogs.map((dog) => (
          <div key={dog.id}>
            <DogCard
              id={dog.id}
              imageClass={imageClass}
              imageUrl={dog.imageUrl}
              name={dog.name}
              breed={dog.breed}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
