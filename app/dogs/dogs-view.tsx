"use client";

import type { Dog } from "@prisma/client";
import { useEffect, useState } from "react";
import { getDogs } from "@/app/_actions/dog";
import DogSearch from "./dog-search";
import DogList from "./dog-list";

export default function DogsView() {
  const [searchText, setSearchText] = useState("");
  const [dogs, setDogs] = useState<Dog[]>([]);

  console.log("DogsView:", searchText, dogs);

  useEffect(() => {
    getDogs(searchText).then((dogs) => {
      console.log("DogsView:searched dogs...", dogs);
      setDogs(dogs);
    });
  }, [searchText]);

  return (
    <div className="flex flex-col items-center">
      <div className="">
        <DogSearch onSearch={(text) => setSearchText(text)} />
      </div>
      <div className="w-full mt-8">
        <DogList dogs={dogs} />
      </div>
    </div>
  );
}
