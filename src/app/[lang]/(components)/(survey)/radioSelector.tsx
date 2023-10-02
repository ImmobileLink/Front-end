// seletor de satisfação horizontal de 1 a 5...
"use client";

import { Survey } from "@/app/i18n/dictionaries/types";

interface RadioSelectorProps {
    params: {
        lang: Survey;
        pergunta: string;
        optional: boolean;
    };
}

export default function RadioSelector({
    params: { lang, pergunta, optional },
}: RadioSelectorProps) {
    const renderRadioOptions = () => {
        let radios = [];

        for (let i = 1; i <= 5; i++) {
            radios.push(
                <div className="justify-center align-center flex flex-col">
                    <input
                        className="w-8 h-8"
                        type="radio"
                        id={`op` + i}
                        value={`op` + i}
                        name={pergunta}
                    />
                    <label className="ml-[35%]" htmlFor={`op` + i}>
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
            <div className="bg-branco dark:bg-dark-200 rounded px-2 py-2">
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
