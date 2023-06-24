import { type Tailwind } from "tailwindest/dist/types/tailwind";
// import { useId } from "react";
import Image from "next/image";
import Link from "next/link";

export type DogCardProps = {
  id: number;
  imageClass?: [Tailwind["width"] | null, Tailwind["height"] | null];
  imageUrl: string;
  name: string;
  breed: string;
};

export default async function DogCard({
  id,
  imageClass = ["w-96", "h-64"],
  imageUrl,
  name,
  breed,
}: DogCardProps) {
  // const id = useId();
  return (
    <div
      className={`inline-block min-w-[24rem] ${imageClass[0] ?? ""} border 
      border-gray-400 rounded shadow dark:border-gray-500`}
    >
      <div
        className={`relative min-h-[16rem] ${imageClass[1] ?? ""}
        bg-gray-300 rounded dark:bg-gray-700`}
      >
        <Image
          src={imageUrl}
          alt={`Dog (${name}) pic`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <form className="p-4 md:p-6">
        <div className="mb-6">
          <label
            htmlFor={id + "-name"}
            className="block mb-2 text-sm font-medium text-gray-900 
              dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id={id + "-name"}
            className="bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 
              dark:border-gray-600 dark:text-white"
            value={name}
            disabled
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor={id + "-breed"}
            className="block mb-2 text-sm font-medium text-gray-900 
              dark:text-white"
          >
            Breed
          </label>
          <input
            type="text"
            id={id + "-breed"}
            className="bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 
              dark:border-gray-600 dark:text-white"
            value={breed}
            disabled
          />
        </div>
        <div className="pt-2">
          <Link
            className="inline-block text-white bg-gradient-to-br from-green-400 
            to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
            focus:ring-green-200 dark:focus:ring-green-800 font-medium 
              rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            href={`/dogs/${id}/edit`}
          >
            E D I T
          </Link>
        </div>
      </form>
    </div>
  );
}
