import { Dictionaries } from "@/app/i18n/dictionaries/types";
import Image from "next/image";
import Link from "next/link";
import CardRoot from "../../(components)/(compositions)/(card)/CardRoot";
import { getDictionary } from "../../dictionaries";
import SurveyForm from "./(survey)/components/SurveyForm";
import { formataDataSemHora } from "lib/utils/formataData";
import { serverSupabase } from "lib/utils/serverSupabase";
import { getSurveyData } from "./surveyConfig";

interface PageProps {
    params: {
        id: string;
        lang: string;
    };
}

export default async function Survey({ params: { id, lang } }: PageProps) {
    const supabase = await serverSupabase();
    const surveyData = await getSurveyData(supabase, id);
    const dict: Dictionaries = await getDictionary(lang);

    const survey = dict.survey;

    return (
        <div className="w-full h-fit select-none min-h-screen bg-branco dark:bg-dark-200 flex flex-col justify-center items-center">
            <nav className="w-full fixed top-0 z-50 bg-white dark:bg-gray-900 ">
                <div className="w-full flex flex-wrap items-center justify-center mx-auto p-4">
                    <div className="flex items-center">
                        <Link href="/feed" className="flex items-center">
                            <Image
                                className="w-10 h-10"
                                src="assets/favicon/favicon-32x32.png"
                                alt="logo"
                                width={10}
                                height={10}
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                ImmobileLink
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="sm:mx-auto w-full lg:w-2/3 lg:min-w-[900px] px-4 md:px-12">
                {
                    surveyData && // verifica se existe uma pesquisa com esse id
                        surveyData.formularioresposta && surveyData.formularioresposta?.length >= 1 ?
                        // existe
                        // verifica se a pesquisa já foi respondida
                        surveyData.formularioresposta[0].status ?
                            // ja foi respondido
                            (

                                <div className="text-black dark:text-white text-justify px-4">
                                    <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold">
                                        {survey.thanksforanswering}
                                    </h1>
                                    <div className="text-sm md:text-base lg:text-lg">
                                        <p>{survey.bestregards + ","}</p>
                                        <p>ImmobileLink</p>
                                    </div>
                                </div>
                            )
                            :
                            // formulario
                            surveyData.visita && surveyData.visita?.length >= 1 &&
                            (
                                <CardRoot className="h-full px-7 py-2 my-24">
                                    <h1 className="text-xl md:text-2xl my-2 md:my-4">
                                        {survey.dear + " " + surveyData.visita[0].cliente}
                                    </h1>
                                    <h2 className="text-lg md:text-xl my-2 md:my-4">
                                        {survey.welcome}
                                    </h2>
                                    <div className="text-justify lg:text-start">
                                        <p className="pb-2">
                                            {survey.referenceday + " "}
                                            <span className="font-bold">{formataDataSemHora(surveyData.visita![0].datavisita) + " "}</span>
                                            {survey.referencebroker + " "}
                                            <span className="font-bold">{surveyData.visita![0].corretor + ", "}</span>
                                            {survey.referencecompany + " "}
                                            <span className="font-bold">{surveyData.visita![0].corporacao + "."}</span>
                                        </p>
                                        <p>{survey.explanationsurveysite1}</p>
                                        <p className="pb-8">{survey.explanationsurveysite2}</p>
                                    </div>
                                    <SurveyForm survey={survey} id={id} />
                                </CardRoot>
                            )
                        :
                        // não existe
                        (
                            <h1 className="text-black dark:text-white text-xl md:text-2xl lg:text-3xl font-extrabold text-center">
                                {survey.nosurveyfound}
                            </h1>
                        )
                }
            </div >
        </div >
    );
}