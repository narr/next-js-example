"use client";

import { useState } from "react";

export default function TestPage() {
  const [name, setName] = useState("test");
  console.log(name);
  return (
    <input
      type="text"
      defaultValue={"abcd"}
      onChange={(e) => {
        setName(e.target.value);
      }}
    />
  );
}
