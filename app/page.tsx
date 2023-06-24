import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const links = [
    {
      name: "Dogs",
      path: "/dogs",
      description:
        "Display dogs with a card UI and it allows to edit a dog's information.",
    },
    {
      name: "Docs",
      path: "https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app",
      description: "Find in-depth information about Next.js features and API.",
    },
    {
      name: "Learn",
      path: "/dogs",
      description: "Learn about Next.js in an interactive course with quizzes!",
    },
    {
      name: "Templates",
      path: "/dogs",
      description: "Explore the Next.js 13 playground.",
    },
    {
      name: "Deploy",
      path: "/dogs",
      description:
        "Instantly deploy your Next.js site to a shareable URL with Vercel.",
    },
  ];

  return (
    <main
      className="min-h-screen 
        bg-[linear-gradient(to_bottom,rgb(var(--background-start-rgb)),rgb(var(--background-end-rgb)))]
        flex flex-col items-center justify-between px-20 py-14"
    >
      <div className="w-full flex justify-end">
        <div className="font-mono text-sm">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 
              lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div
        className="z-10 flex place-items-center before:absolute before:h-[300px] 
          before:w-[480px] before:-translate-x-1/2 before:bg-gradient-radial 
        before:from-white before:to-transparent before:blur-2xl 
          before:content-[''] after:absolute after:-z-20 after:h-[180px] 
          after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic 
          after:from-sky-200 after:via-blue-200 after:blur-2xl 
          after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent 
          before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 
          after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]"
      >
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-16 lg:grid-cols-4 lg:text-left">
        {links.map((link, i) => (
          <Link
            key={i}
            className="group rounded-lg border border-transparent px-5 py-4 
              transition-colors hover:border-gray-300 hover:bg-gray-100 
            hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            href={link.path}
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              {link.name}&nbsp;
              <span
                className="inline-block transition-transform 
                  group-hover:translate-x-1 motion-reduce:transform-none"
              >
                -&gt;
              </span>
            </h2>
            <p className={`max-w-[30ch] text-sm opacity-50`}>
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
