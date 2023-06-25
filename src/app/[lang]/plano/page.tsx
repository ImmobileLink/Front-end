"use client";
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { Signup5 } from "@/app/i18n/dictionaries/types";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import NavBar from "../NavBar"

interface pageProps {}

export default async function page({}: pageProps ) {

  const tipoPerfil = 1;
  return (
    <>
      <NavBar/>
      <div>
        <div className="w-full h-fit grid grid-cols-1 justify-items-center gap-x-32 gap-y-10 md:grid-cols-2">
          <div className="w-60 h-fit grid justify-items-center gap-3 justify-self-center md:justify-self-end">
            <span className="font-bold text-2xl tracking-wider text-black dark:text-branco">
              FREE
            </span>
            <div className="bg-gray-400 rounded-full h-60 w-full">
              {tipoPerfil == 1 ? (
                <Suspense fallback="Loading...">
                  <Image
                    className="mx-auto h-60 w-auto"
                    src="assets/login/contacorretorfree.png"
                    width={1}
                    height={1}
                    alt="corretor"
                  />
                </Suspense>
              ) : (
                <Suspense fallback="Loading...">
                  <Image
                    className="mx-auto h-64 w-auto"
                    src="assets/login/contaempresafree.png"
                    width={1}
                    height={1}
                    alt="corretor"
                  />
                </Suspense>
              )}
            </div>

            <div className="w-full text-justify text-black dark:text-branco">
              {tipoPerfil == 1
                ? "oi"
                : "oi"}
            </div>

            <hr className="w-full h-0,5 border-0 bg-gray-600" />

            <div className="w-full text-center text-black dark:text-branco">
              {tipoPerfil == 1 ? (
                <>
                  <div className="flex justify-center">
                    <AiOutlineCheck className="self-center" />
                    {"oi"}
                  </div>
                  <div className="flex justify-center">
                    <AiOutlineCheck className="self-center" />
                    {"oi"}
                  </div>
                  <div className="flex justify-center">
                    <AiOutlineCheck className="self-center" />
                    {"oi"}
                  </div>
                  <div className="flex justify-center">
                    <AiOutlineCheck className="self-center" />
                    {"oi"}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center">
                    <AiOutlineCheck className="self-center" />
                    {"oi"}
                  </div>
                  <div className="flex justify-center">
                    <AiOutlineCheck className="self-center" />
                    {"oi"}
                  </div>
                  <div className="flex justify-center">
                    <AiOutlineCheck className="self-center" />
                    {"oi"}
                  </div>
                  <div className="flex justify-center">
                    <AiOutlineCheck className="self-center" />
                    {"oi"}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="w-60 h-fit grid justify-items-center gap-3 justify-self-center md:justify-self-start">
            <span className="font-bold text-2xl tracking-wider text-black dark:text-branco">
              PREMIUM
            </span>
            <div className="bg-gray-400 rounded-full h-60 w-full">
              {tipoPerfil == 1 ? (
                <Suspense fallback="Loading...">
                  <Image
                    className="mx-auto h-60 w-auto"
                    src="assets/login/contacorretorpremium.png"
                    width={1}
                    height={1}
                    alt="corretor"
                  />
                </Suspense>
              ) : (
                <Suspense fallback="Loading...">
                  <Image
                    className="mx-auto h-60 w-auto"
                    src="assets/login/contaempresapremium.png"
                    width={1}
                    height={1}
                    alt="corretor"
                  />
                </Suspense>
              )}
            </div>

            <div className="w-full text-justify text-black dark:text-branco">
              {tipoPerfil == 1
                ? "oi"
                : "oi"}
            </div>

            <hr className="w-full h-0,5 border-0 bg-gray-600" />

            <div className="w-full text-center text-black dark:text-branco">
              {tipoPerfil == 1 ? (
                <>
                  <div className="flex justify-center">
                    <AiOutlineCheck className="self-center" />
                    {"oi"}
                  </div>
                  <div className="flex justify-center">
                    <AiOutlineCheck className="self-center" />
                    {"oi"}
                  </div>
                  <div className="flex justify-center">
                    <AiOutlineCheck className="self-center" />
                    {"oi"}
                  </div>
                  <div className="flex justify-center">
                    <AiOutlineCheck className="self-center" />
                    {"oi"}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center">
                    <AiOutlineCheck className="self-center" />
                    {"oi"}
                  </div>
                  <div className="flex justify-center">
                    <AiOutlineCheck className="self-center" />
                    {"oi"}
                  </div>
                  <div className="flex justify-center">
                    <AiOutlineCheck className="self-center" />
                    {"oi"}
                  </div>
                  <div className="flex justify-center">
                    <AiOutlineCheck className="self-center" />
                    {"oi"}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-7">
          <div className="flex justify-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 ">
                {"oi"}
                <span className="hover:text-orange-400 ease-in-out duration-500">
                  {"oi"}
                </span>
              </span>
            </label>
          </div>
          {true ? (
            <div className="flex justify-center">
              <button
                className="ml-3 text-xs font-medium text-gray-500"
              >
                {"oi"}
              </button>
            </div>
          ) : (
            <></>
          )}
          <button
            className="flex w-full mt-7 justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
          >
            {"oi"}
          </button>
        </div>
      </div>
    </>
  );
}