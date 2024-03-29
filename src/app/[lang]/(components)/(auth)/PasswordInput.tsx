"use client";

import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { useState } from "react";
import React from "react";

interface PasswordInputProps {
    password: string;
    label: string;
    onchange: Function;
    fieldErros: Array<string> | undefined;
}

export default function PasswordInput({
    password,
    label,
    onchange,
    fieldErros,
}: PasswordInputProps) {
    const [showPassword, isShowPassword] = useState(false);

    return (
        <>
            <div className="relative z-0 w-full mb-6 group">
                {showPassword ? (
                    <div className="flex">
                        <input
                            type="text"
                            name="floating_password"
                            id="floating_password"
                            className={`${fieldErros?.[0] ? "bg-red-500/50" : ""
                                } mt-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            placeholder=" "
                            required
                            value={password}
                            onChange={(e) => onchange(e.target.value)}
                        />
                        <div
                            className={`${fieldErros?.[0] ? "bg-red-500/50" : ""
                                } mt-2 border-0 border-b-2 border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600`}
                        >
                            <BsEyeFill
                                className="text-3xl mr-2 mt-2"
                                onClick={() => isShowPassword(false)}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex">
                        <input
                            type="password"
                            name="floating_password"
                            id="floating_password"
                            className={`${fieldErros?.[0] ? "bg-red-500/50" : "bg-transparent"
                                } mt-2 block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            placeholder=" "
                            required
                            value={password}
                            onChange={(e) => onchange(e.target.value)}
                        />
                        <div
                            className={`${fieldErros?.[0] ? "bg-red-500/50" : ""
                                } mt-2 border-0 border-b-2 border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600`}
                        >
                            <BsEyeSlashFill
                                className="text-3xl mt-2 mr-2"
                                onClick={() => isShowPassword(true)}
                            />
                        </div>
                    </div>
                )}
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    {label}
                </label>
            </div>
        </>
    );
}
