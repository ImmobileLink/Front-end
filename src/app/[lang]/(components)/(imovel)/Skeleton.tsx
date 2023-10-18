"use client";
import { Database } from "../../../../../lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface SkeletonProps {
  num: number;
}

const supabase = createClientComponentClient<Database>();

export default function Skeleton({ num }: SkeletonProps) {
  return Array(num).fill(0).map((el, index) => (
      <div key={index}>
        <div className="relative bg-gray-100 dark:bg-dark-100 ring-2 ring-gray-300 dark:ring-dark-300 focus:ring-gray-500 focus:ring-2 focus:ring-offset-2 shadow-md rounded-md p-4 align-middle w-full mb-4 animate-pulse">
          <div className="flex justify-center relative rounded-lg overflow-hidden">
            <div className="object-cover my-2 h-44 w-full rounded-md flex-none text-center z-0 flex items-center justify-center bg-gray-300 dark:bg-gray-500"></div>
          </div>

          <div className="mt-2">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-500 my-4"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-500 mb-2.5"></div>
          </div>

          <div className="mt-5">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          </div>

          <div className="mt-5">
            <div className="flex">
              <div className="flex-auto items-center mx-5 pt-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-500 p-2 w-full self-center rounded-lg text-sm pt-2.5 text-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
}
