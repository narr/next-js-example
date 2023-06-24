import Link from "next/link";
import { getDog } from "@/app/_actions/dog";
import DogEditCard from "./dog-card-edit";

export default async function DogEditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const dog = await getDog(Number(id));
  return dog ? (
    <DogEditCard
      id={dog.id}
      imageClass={["w-[36rem]", "h-[27rem]"]}
      imageUrl={dog.imageUrl}
      name={dog.name}
      breed={dog.breed}
    />
  ) : (
    <div
      className="w-6/12 flex p-4 text-red-800 border-t-4 border-red-300
        bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
      role="alert"
    >
      <svg
        className="flex-shrink-0 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 
              012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 
              00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <div className="ml-3 text-sm font-medium">
        The selected dog does not exist.&nbsp;&nbsp;
        <Link
          href="/dogs"
          className="font-semibold underline hover:no-underline"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}
