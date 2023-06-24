import Link from "next/link";
import DogsView from "./dogs-view";

export default function DogsPage() {
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
      <DogsView />
    </main>
  );
}
