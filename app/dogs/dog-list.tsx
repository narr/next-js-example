import DogCard, { DogCardProps } from "./dog-card";

export default function DogList({ dogs }: { dogs: DogCardProps[] }) {
  const imageClass: DogCardProps["imageClass"] = ["w-full", "h-[28rem]"];
  // console.log("DogList: dogs...", dogs);
  return (
    <div
      className="grid grid-cols-[repeat(auto-fill,500px)] 
          auto-rows-max place-content-center gap-9"
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
  );
}
