"use client";

import type { Dog } from "@prisma/client";
import { type Tailwind } from "tailwindest/dist/types/tailwind";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition, useEffect } from "react";
import { getNewDogImage, updateDog } from "@/app/_actions/dog";
import { useForm } from "react-hook-form";
import StyledFormDevtool from "@/app/_components/styled-form-devtool";
import { useLocalStorage, useEventListener } from "usehooks-ts";

export type DogEditCardProps = {
  id: number;
  imageClass?: [Tailwind["width"] | null, Tailwind["height"] | null];
  imageUrl: string;
  name: string;
  breed: string;
};

export default function DogCardEdit({
  id,
  imageClass = ["w-96", "h-64"],
  imageUrl,
  name,
  breed,
}: DogEditCardProps) {
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
  const [isFetchingImage, startTransitionImage] = useTransition();
  const {
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, isSubmitting, isSubmitSuccessful, errors },
  } = useForm<Dog>({
    mode: "onChange",
    defaultValues: {
      id,
      imageUrl,
      name,
      breed,
    },
  });
  const [formLocalStorage, setFormLocalStorage] = useLocalStorage(
    "__REACT_HOOK_FORM_DEVTOOLS__",
    {}
  );

  useEventListener("beforeunload", (e) => {
    console.log("beforeunload....", e);
    setFormLocalStorage({});
    // show a confirm modal from a browser
    // e.preventDefault();
    // e.returnValue = '';
  });

  useEffect(() => {
    console.log("isSubmitSuccessful change...", isSubmitSuccessful);
    if (isSubmitSuccessful) {
      reset(getValues());
    }
  }, [isSubmitSuccessful]);

  const visibleInputFields = [
    {
      key: "name",
      value: name,
    },
    {
      key: "breed",
      value: breed,
    },
  ];

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
          src={currentImageUrl}
          alt={`Dog (${name}) pic`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <button
          className={`${
            isFetchingImage ? "animate-spin cursor-auto" : "cursor-pointer"
          } absolute right-5 top-3`}
          onClick={() =>
            startTransitionImage(async () => {
              const imgUrl = await getNewDogImage();
              setCurrentImageUrl(imgUrl);
              setValue("imageUrl", imgUrl, {
                shouldTouch: true,
                shouldDirty: true,
              });
            })
          }
        >
          <svg
            className="h-8 w-8 text-cyan-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 
                11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
      <StyledFormDevtool control={control} />
      <form
        className="p-4 md:p-6 md:pt-4"
        // NOTE: this doesn't refresh the page
        onSubmit={handleSubmit(async () => {
          const values = getValues();
          console.log("before submit: fieldValues...", values);
          await updateDog(values);
          console.log("after submit");
        })}
      >
        <div>
          <input type="hidden" {...register("id", { required: true })} />
          <input type="hidden" {...register("imageUrl", { required: true })} />
        </div>
        {visibleInputFields.map((field) => (
          <div key={field.key} className="mb-4">
            <div className="flex justify-between items-center mb-2 min-h-[2.5rem]">
              <label
                htmlFor={id + "-" + field.key}
                className="text-sm font-medium text-gray-900 capitalize
                dark:text-white"
              >
                {field.key}
              </label>
              {errors[field.key as keyof Dog] && (
                <div
                  className="flex p-2 text-sm text-red-800 rounded-lg 
                bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 inline w-5 h-5 mr-3"
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
                  <span className="sr-only">Info</span>
                  <span className="font-medium">This field is required.</span>
                </div>
              )}
            </div>
            <input
              type="text"
              id={id + "-" + field.key}
              className="bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 
              dark:border-gray-600 dark:text-white"
              // better to set it to prevent flickering of the default value on init
              defaultValue={field.value}
              {...register(field.key as keyof Dog, { required: true })}
            />
          </div>
        ))}
        <div className="pt-2 flex justify-between">
          <Link
            className="inline-block text-gray-900 bg-gradient-to-r from-teal-200 
              to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 
              hover:to-lime-200 focus:ring-4 focus:outline-none 
              focus:ring-lime-200 dark:focus:ring-teal-700 font-medium 
              rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 min-w-[8rem]"
            href="/dogs"
          >
            &nbsp;&nbsp;BACK&nbsp;&nbsp;
          </Link>
          <button
            type="submit"
            className="inline-block text-white enabled:bg-gradient-to-br from-green-400 
            to-blue-600 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
            focus:ring-green-200 dark:focus:ring-green-800 font-medium 
              rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 disabled:bg-gray-400
              disabled:cursor-not-allowed min-w-[8rem]"
            disabled={!isDirty || !isValid || isSubmitting}
            // NOTE: this does refresh the page!
            // onClick={async () => {
            //   const values = getValues();
            //   console.log("before submit: fieldValues...", values);
            //   await updateDog(values);
            //   console.log("after submit");
            // }}
            // NOTE: this doesn't refresh the page
            // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#formaction
            // formAction={async () => {
            //   const values = getValues();
            //   console.log("before submit: fieldValues...", values);
            //   await updateDog(values);
            //   console.log("after submit");
            // }}
          >
            {isSubmitting ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858
                    100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 
                    0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 
                    50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 
                    91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 
                    72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 
                    9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 
                  33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 
                  15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 
                  1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 
                  1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 
                  9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 
                  9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 
                  15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 
                  28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 
                  39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : null}
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}
