"use client";

import Loading from "@/app/[lang]/(components)/(auth)/Loading";
import { Signup5 } from "@/app/i18n/dictionaries/types";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";

interface PaymentFormProps {
    isLoading: Function;
    loading: boolean;
    handleSignUp: Function;
    signup5: Signup5;
}

export default function PaymentForm({
    isLoading,
    loading,
    handleSignUp,
    signup5,
}: PaymentFormProps) {
    const [nome, setNome] = useState("");
    const [cartao, setCartao] = useState("");
    const [vencimento, setVencimento] = useState("");
    const [cvv, setCvv] = useState("");
    const [desabilitar, isDesabilitar] = useState(true);

    useEffect(() => {
        if (nome.length < 4 && cartao.length != 19) {
            // 3 espaços + 16 dígitos
            isDesabilitar(true);
            return;
        }

        if (vencimento.length != 5) {
            isDesabilitar(true);
            return;
        } else {
            let data = vencimento.split("/");
            let mes = parseInt(data[0]);
            if (
                Number.isNaN(parseInt(data[0])) ||
                mes > 12 ||
                mes < 1 ||
                Number.isNaN(parseInt(data[1]))
            ) {
                isDesabilitar(true);
                return;
            }
        }

        if (cvv.length > 4 || cvv.length < 3) {
            isDesabilitar(true);
            return;
        }

        isDesabilitar(false);
    }, [nome, cartao, vencimento, cvv, desabilitar]);

    return (
        <div>
            <div>
                <input
                    type="text"
                    name="floating_name_title"
                    id="floating_name_title"
                    className={`bg-transparent border-gray-300 block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                    required
                    autoFocus
                    onChange={(e) => setNome(e.target.value)}
                />
                <label className="peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                    {signup5.fullname}
                </label>
                <div>
                    <InputMask
                        mask={"9999 9999 9999 9999"}
                        type="text"
                        name="floating_credit_card"
                        id="floating_credit_card"
                        className={`bg-transparent border-gray-300 block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                        placeholder=" "
                        required
                        onChange={(e) => setCartao(e.target.value)}
                    />
                    <label className="peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                        {signup5.cardnumber}
                    </label>
                </div>
                <div className="flex flex-row justify-between">
                    <div>
                        <InputMask
                            mask={"99/99"}
                            type="text"
                            name="floating_expiration_date"
                            id="floating_expiration_date"
                            className={`bg-transparent border-gray-300 block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            placeholder=" "
                            required
                            onChange={(e) => setVencimento(e.target.value)}
                        />
                        <label className="peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                            {signup5.expirydate}
                        </label>
                    </div>
                    <div>
                        <input
                            type="number"
                            name="floating_name_title"
                            id="floating_name_title"
                            className={`bg-transparent border-gray-300 block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            placeholder=" "
                            max={4}
                            required
                            onChange={(e) => setCvv(e.target.value)}
                        />
                        <label className="peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                            {signup5.code}
                        </label>
                    </div>
                </div>
            </div>
            <a className="text-sm mt-8 text-black/50 dark:text-white/50">
                {signup5.disclaimer}
            </a>
            {/* <a className="text-sm font-medium text-secundaria-100 cursor-pointer">{" "}Saiba mais</a> */}
            <button
                disabled={desabilitar === true}
                onClick={() => {
                    isLoading(true);
                    handleSignUp();
                }}
                className="disabled:opacity-75 flex w-full mt-7 justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
            >
                {<Loading loading={loading} />}
                <span>{signup5.subscriptionmessage1}</span>
            </button>
        </div>
    );
}
