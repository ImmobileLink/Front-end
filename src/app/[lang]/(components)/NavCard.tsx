"use client";
import Link from "next/link";
import React from "react";
import LogOut from "./LogOut";
import { Navbarbuttons } from "@/app/i18n/dictionaries/types";

interface NavCardProps {
  navbarbuttons: Navbarbuttons
};

export default function NavCard({navbarbuttons}: NavCardProps) { 
    return (
      <div className="">
        <Link
          href="/feed"
          className="flex my-1 py-1 px-1  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 justify-center text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg 
          text-xs sm:text-base items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-0 h-0 sm:w-4 sm:h-4 md:w-6 md:h-6 mx-1 justify-start"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Home
        </Link>

        <Link
          href="/pesquisa"
          className="flex my-1 py-1 px-1  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 justify-center text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg 
          text-xs sm:text-base items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-0 h-0 sm:w-4 sm:h-4 md:w-6 md:h-6 mx-1 justify-start"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          {navbarbuttons.searchbutton}
        </Link>

        <LogOut texto={navbarbuttons.logoutbutton}/>
      </div>
    );
};