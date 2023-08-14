"use client";

import { Dispatch, SetStateAction } from "react";
import { Signup1 } from "@/app/i18n/dictionaries/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../../lib/database.types";
import PasswordInput from "@/app/[lang]/(components)/(auth)/PasswordInput";

interface SignUpProps {
    props: {
        email: string;
        setEmail: Dispatch<SetStateAction<string>>;
        senha: string;
        setSenha: Dispatch<SetStateAction<string>>;
    };
    setPodeAvancar: Dispatch<SetStateAction<boolean>>;
    setAlert: Dispatch<
        SetStateAction<{ type: string; title: string; message: string }>
    >;
    signup1: Signup1;
}

const supabase = createClientComponentClient<Database>();

export default function SignUp1({
    props,
    setAlert,
    signup1,
    setPodeAvancar,
}: SignUpProps) {
    const validaForm = () => {
        setPodeAvancar(false);

        if (props.email == "") {
            return false;
        }

        if (props.senha == "") {
            return false;
        }

        setPodeAvancar(true);
    };

    return (
        <>
            <div className="space-y-6 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        autoFocus
                        value={props.email}
                        onChange={(e) => props.setEmail(e.target.value)}
                        onBlur={validaForm}
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {signup1.emaillabel}
                    </label>
                </div>

                <PasswordInput
                    password={props.senha}
                    label={signup1.passwordlabel}
                    validaForm={validaForm}
                    onchange={props.setSenha}
                />
            </div>
        </>
    );
}
