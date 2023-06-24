import Link from "next/link";
import { getDogs } from "@/app/_actions/dog";
import DogSearch from "./dog-search";
import DogList from "./dog-list";

export default async function DogsPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log(`🚀 ~ file: DogsPage.tsx ~ searchParams:`, searchParams);

  const dogSearchParamName = "dog-search";
  let encodedSearchText = searchParams[dogSearchParamName];
  encodedSearchText = Array.isArray(encodedSearchText)
    ? encodedSearchText[0]
    : encodedSearchText;
  const decodedSearchText = encodedSearchText
    ? decodeURIComponent(encodedSearchText)
    : encodedSearchText;

  console.log(
    `🚀 ~ file: DogsPage.tsx ~ decodedSearchText:`,
    decodedSearchText
  );
  const dogs = await getDogs(decodedSearchText);

  return (
    <main className="min-h-screen px-20 py-10 pb-16">
      <div className="flex justify-between items-center mb-4">
        <Link
          className="inline-flex items-center rounded-lg px-6 py-3 
          hover:outline hover:outline-1 hover:outline-orange-500
          dark:text-gray-500"
          href="/"
        >
          <span aria-hidden="true" className="mr-4 text-4xl pb-1">
            ←
          </span>
          Back Home
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <div className="">
          <DogSearch
            dogSearchParamName={dogSearchParamName}
            defaultValue={decodedSearchText}
          />
        </div>
        <div className="w-full mt-8">
          <DogList dogs={dogs} />
        </div>
      </div>
    </main>
  );
}
