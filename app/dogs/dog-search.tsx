"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function DogSearch({
  dogSearchParamName,
  defaultValue,
}: {
  dogSearchParamName: string;
  defaultValue?: string;
}) {
  const [searchString, setSearchString] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const passSearchTextToUrl = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    console.log(
      `🚀 ~ file: dog-search.tsx:21 ~ passSearchTextToUrl ~ searchParams & currentParams:`,
      searchParams,
      currentParams
    );

    if (searchString) {
      currentParams.set(dogSearchParamName, encodeURIComponent(searchString));
    } else {
      currentParams.delete(dogSearchParamName);
    }
    const search = currentParams.toString();
    const query = search ? `?${search}` : "";
    const href = `${pathname}${query}`;
    console.log(
      `🚀 ~ file: dog-search.tsx:34 ~ passSearchTextToUrl ~ href:`,
      href
    );

    // https://nextjs.org/docs/app/api-reference/functions/use-router#userouter
    // router.refresh()
    // router.replace(href: string)
    router.push(`${pathname}${query}`);
  };

  return (
    <div className="flex gap-6">
      <form
        className="flex items-center"
        onSubmit={(e) => {
          // prevent reload page
          e.preventDefault();
          passSearchTextToUrl();
        }}
      >
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-[30rem]">
          <div
            className="absolute inset-y-0 left-0 flex items-center pl-3 
            pointer-events-none"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 
                  4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
              block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500"
            placeholder="Search"
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
            defaultValue={defaultValue}
          />
        </div>
        <button
          type="submit"
          className="p-2.5 px-8 ml-2 text-sm font-medium text-white bg-blue-700 
            rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 
            focus:outline-none focus:ring-blue-300 dark:bg-blue-600 
            dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
    </div>
  );
}
