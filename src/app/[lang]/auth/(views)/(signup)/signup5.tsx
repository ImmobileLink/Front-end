"use client";
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { Signup5 } from "@/app/i18n/dictionaries/types";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import Loading from "@/app/[lang]/(components)/(auth)/Loading";
import PaymentMethod from "./payment";

interface Signup5Props {
    props: {
        premium: boolean;
        setPremium: Dispatch<SetStateAction<boolean>>;
    };
    tipoPerfil: number | undefined;
    setAlert: Dispatch<
        SetStateAction<{ type: string; title: string; message: string }>
    >;
    signup5: Signup5;
    handleSignUp: () => Promise<void>;
}

export default function Signup5({
    props,
    tipoPerfil,
    setAlert,
    signup5,
    handleSignUp,
}: Signup5Props) {
    const [metodoPagamento, setMetodoPagamento] = useState<boolean>(false);
    const [loading, isLoading] = useState(false);

    useEffect(() => {
        props.setPremium(false);
        isLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkoutSignUp = () => {
        isLoading(true);
        if (props.premium) {
            setMetodoPagamento(!metodoPagamento);
            isLoading(false);
        } else {
            handleSignUp();
        }
    };

    return (
        <>
            <div>
                <div className="w-full h-fit grid grid-cols-1 justify-items-center gap-x-32 gap-y-10 md:grid-cols-2">
                    <div
                        className={`${
                            !props.premium
                                ? "bg-dark-100/25 dark:bg-white/25 rounded-lg"
                                : ""
                        } px-2 py-2 w-64 h-fit grid justify-items-center gap-3 justify-self-center md:justify-self-end`}
                    >
                        <span className="font-bold text-2xl tracking-wider text-black dark:text-branco">
                            FREE
                        </span>
                        <div
                            className="bg-gray-400 rounded-full h-60 w-full cursor-pointer"
                            onClick={() => {
                                props.setPremium(false);
                            }}
                        >
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
                                ? signup5.corretor.freelabel
                                : signup5.company.freelabel}
                        </div>

                        <hr className="w-full h-0,5 border-0 bg-gray-600" />

                        <div className="w-full text-center text-black dark:text-branco">
                            {tipoPerfil == 1 ? (
                                <div>
                                    {/* <div className="py-2">
                                        <a className="font-bold text-3xl pr-2">
                                            R$0
                                        </a>
                                        <a>/ mês</a>
                                    </div> */}
                                    <div className="flex justify-left">
                                        <AiOutlineCheck className="self-center" />
                                        {signup5.corretor.freedescription1}
                                    </div>
                                    <div className="flex justify-left">
                                        <AiOutlineCheck className="self-center" />
                                        {signup5.corretor.freedescription2}
                                    </div>
                                    <div className="flex justify-left">
                                        <AiOutlineCheck className="self-center" />
                                        {signup5.corretor.freedescription3}
                                    </div>
                                    <div className="flex justify-left">
                                        <AiOutlineCheck className="self-center" />
                                        {signup5.corretor.freedescription4}
                                    </div>
                                    <button
                                        onClick={() => {
                                            props.setPremium(false);
                                        }}
                                        className="mt-4 flex w-full justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
                                    >
                                        {props.premium
                                            ? signup5.select
                                            : signup5.selected}
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    {/* <div className="py-2">
                                        <a className="font-bold text-3xl pr-2">
                                            R$0
                                        </a>
                                        <a>/ mês</a>
                                    </div> */}
                                    <div className="flex justify-left">
                                        <AiOutlineCheck className="self-center" />
                                        {signup5.company.freedescription1}
                                    </div>
                                    <div className="flex justify-left">
                                        <AiOutlineCheck className="self-center" />
                                        {signup5.company.freedescription2}
                                    </div>
                                    <div className="flex justify-left">
                                        <AiOutlineCheck className="self-center" />
                                        {signup5.company.freedescription3}
                                    </div>
                                    <div className="flex justify-left">
                                        <AiOutlineCheck className="self-center" />
                                        {signup5.company.freedescription4}
                                    </div>
                                    <button
                                        onClick={() => {
                                            props.setPremium(false);
                                        }}
                                        className="mt-4 flex w-full justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
                                    >
                                        {props.premium
                                            ? signup5.select
                                            : signup5.selected}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        className={`${
                            props.premium
                                ? "bg-dark-100/25 dark:bg-white/25 rounded-lg"
                                : ""
                        } px-2 py-2 w-64 h-fit grid justify-items-center gap-3 justify-self-center md:justify-self-start`}
                    >
                        <span className="font-bold text-2xl tracking-wider text-black dark:text-branco">
                            PREMIUM
                        </span>
                        <div
                            className="bg-gray-400 rounded-full h-60 w-full cursor-pointer"
                            onClick={() => {
                                props.setPremium(true);
                            }}
                        >
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
                                ? signup5.corretor.premiumlabel
                                : signup5.company.premiumlabel}
                        </div>

                        <hr className="w-full h-0,5 border-0 bg-gray-600" />

                        <div className="w-full text-center text-black dark:text-branco">
                            {tipoPerfil == 1 ? (
                                <div>
                                    {/* <div className="py-2">
                                        <a className="font-bold text-3xl pr-2">
                                            R$50
                                        </a>
                                        <a>/ mês</a>
                                    </div> */}
                                    <div className="flex justify-left">
                                        <AiOutlineCheck className="self-center" />
                                        {signup5.corretor.premiumdescription1}
                                    </div>
                                    <div className="flex justify-left">
                                        <AiOutlineCheck className="self-center" />
                                        {signup5.corretor.premiumdescription2}
                                    </div>
                                    <div className="flex justify-left">
                                        <AiOutlineCheck className="self-center" />
                                        {signup5.corretor.premiumdescription3}
                                    </div>
                                    <div className="flex justify-left">
                                        <AiOutlineCheck className="self-center" />
                                        {signup5.corretor.premiumdescription4}
                                    </div>
                                    <button
                                        onClick={() => {
                                            props.setPremium(true);
                                        }}
                                        className="mt-4 flex w-full justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
                                    >
                                        {props.premium
                                            ? signup5.selected
                                            : signup5.select}
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    {/* <div className="py-2">
                                        <a className="font-bold text-3xl pr-2">
                                            R$240
                                        </a>
                                        <a>/ mês</a>
                                    </div> */}
                                    <div className="flex justify-left">
                                        <AiOutlineCheck className="self-center" />
                                        {signup5.company.premiumdescription1}
                                    </div>
                                    <div className="flex justify-left">
                                        <AiOutlineCheck className="self-center" />
                                        {signup5.company.premiumdescription2}
                                    </div>
                                    <div className="flex justify-left">
                                        <AiOutlineCheck className="self-center" />
                                        {signup5.company.premiumdescription3}
                                    </div>
                                    <div className="flex justify-left">
                                        <AiOutlineCheck className="self-center" />
                                        {signup5.company.premiumdescription4}
                                    </div>
                                    <button
                                        onClick={() => {
                                            props.setPremium(true);
                                        }}
                                        className="mt-4 flex w-full justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
                                    >
                                        {props.premium
                                            ? signup5.selected
                                            : signup5.select}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-7">
                    {/* <div className="flex justify-left">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onClick={(e) => props.setPremium(!props.premium)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 ">
                {signup5.subscriptionmessage1 + " "}
                <span className="hover:text-orange-400 ease-in-out duration-500">
                  {signup5.subscriptionmessage2}
                </span>
              </span>
            </label>
          </div> */}
                    {/* {props.premium ? (
            <div className="flex justify-left">
              <button
                className="ml-3 text-xs font-medium text-gray-500"
                onClick={(e) => setMetodoPagamento(!metodoPagamento)}
              >
                {signup5.subscriptionmessage3}
              </button>
            </div>
          ) : (
            <></>
          )} */}
                    <button
                        onClick={checkoutSignUp}
                        className="flex w-full mt-7 justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
                    >
                        <Loading loading={loading} />
                        {signup5.signupbutton}
                    </button>
                </div>
            </div>

            {metodoPagamento ? (
                <PaymentMethod
                    metodoPagamento={metodoPagamento}
                    setMetodoPagamento={setMetodoPagamento}
                    signup5={signup5}
                    isLoading={isLoading}
                    loading={loading}
                    handleSignUp={handleSignUp}
                    tipoPerfil={tipoPerfil}
                />
            ) : (
                <></>
            )}
        </>
    );
}
