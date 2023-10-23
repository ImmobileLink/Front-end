"use client";

import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

interface SetSenhaProps {
    register: any;
    errors: any;
    watch: any;
}

export default function SetSenha({ register, errors, watch }: SetSenhaProps) {

    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <>
            <div className="relative w-full gap-3 flex flex-col">
                <div className=" absolute right-0">
                    {showPassword ? (
                        <BsEyeFill
                            className="text-3xl mr-2 mt-2 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                            size={20}
                        />
                    ) : (
                        <BsEyeSlashFill
                            className="text-3xl mt-2 mr-2 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                            size={20}
                        />
                    )}
                
                </div>
                <div>
                    <label className="text-gray-500 dark:text-gray-300">Senha</label>
                    <input
                        {...register("senha", { required: 'Password is required', minLength: { value: 6, message: "A senha teve ter pelo menos 6 caracteres" } })}
                        type={showPassword ? "text" : "password"}
                        required
                        className={`text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent `} />

                </div>

                <div>
                    <label className="text-gray-500 dark:text-gray-300">Confirmar senha</label>
                    <input
                        {...register("confirma_senha", {
                            required: 'Password is required', validate: (val: string) => {
                                if (watch('senha') != val) {
                                    return "Your passwords do no match";
                                }
                            },
                        })}
                        type={showPassword ? "text" : "password"}
                        required
                        className={`text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent `} />
                </div>
            </div>

            {errors?.senha && <p className="text-red-500 text-xs mt-1">{errors.senha.message}</p>}
            {errors?.confirma_senha && <p className="text-red-500 text-xs mt-1">{errors.confirma_senha.message}</p>}
        </>
    );
}
