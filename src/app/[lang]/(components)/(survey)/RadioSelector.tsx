// seletor de satisfação horizontal de 1 a 5...
"use client";

import { Survey } from "@/app/i18n/dictionaries/types";
import { ChangeEvent } from "react";

interface RadioSelectorProps {
    params: {
        lang: Survey;
        pergunta: string;
        optional: boolean;
        inputName: string,
        leftLabel?: string;
        rightLabel?: string;
    };
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function RadioSelector({
    params: { lang, pergunta, optional, inputName }, onChange
}: RadioSelectorProps) {
    const renderRadioOptions = () => {
        let radios = [];

        for (let i = 1; i <= 5; i++) {
            radios.push(
                <div key={i} className="justify-center align-center flex flex-col">
                    <input
                        className="w-8 h-8"
                        type="radio"
                        id={inputName + `op` + i}
                        value={i}
                        name={inputName}
                        onChange={onChange}
                    />
                    <label className="ml-[35%]" htmlFor={inputName + `op` + i}>
                        {i}
                    </label>
                </div>
            );
        }

        return radios;
    };

    return (
        <>
            <p className="py-2">
                {pergunta}
                <span className="text-primaria">{optional ? "" : " *"}</span>
            </p>

            <div className="bg-gray-200 dark:bg-gray-700 rounded px-2 py-2">
                <div className="flex flex-row justify-between">
                    {renderRadioOptions()}
                </div>
                
            </div>
            <div className="flex flex-row justify-between pb-8">
                <p>{lang.notpleased}</p>
                <p>{lang.pleased}</p>
            </div>
        </>
    );
}