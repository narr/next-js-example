"use server";

import { prisma } from "@/app/utils/prisma";
import type { Prisma, Dog } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getDogs(searchText?: string) {
  return prisma.dog.findMany({
    take: 10,
    orderBy: {
      id: "desc",
    },
    ...(searchText
      ? {
          where: {
            OR: [
              {
                name: {
                  search: searchText,
                },
              } as Prisma.DogWhereInput,
              {
                breed: {
                  search: searchText,
                },
              } as Prisma.DogWhereInput,
            ],
          },
        }
      : null),
  });
}

export async function getDog(id: number) {
  return prisma.dog.findUnique({
    where: {
      id,
    },
  });
}

export async function updateDog(dog: Dog) {
  await prisma.dog.update({
    where: {
      id: dog.id,
    },
    data: dog,
  });
  // NOTE: This is important!
  // need this to update data in pages that it is used
  // no need cache busting
  // revalidatePath("/dogs/[id]/edit")
  revalidatePath(`/dogs/${dog.id}/edit`);
}

export type DogResponse = {
  message: string;
};

export async function getNewDogImage() {
  const res = await fetch("https://dog.ceo/api/breeds/image/random", {
    cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error("Failed to fetch data")
  // }

  const data = (await res.json()) as DogResponse;
  return data.message;
}
