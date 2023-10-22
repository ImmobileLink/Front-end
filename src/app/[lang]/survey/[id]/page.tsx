import { Dictionaries } from "@/app/i18n/dictionaries/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import CardRoot from "../../(components)/(compositions)/(card)/CardRoot";
import { Database } from "../../../../../lib/database.types";
import { getDictionary } from "../../dictionaries";
import SurveyForm from "./(survey)/components/SurveyForm";
import { formataDataSemHora } from "../../../../../lib/utils";
// import { Database } from "../../../../../lib/database.types";
// import PasswordInput from "../../(components)/(auth)/PasswordInput";
// import Loading from "../../(components)/(auth)/Loading";

interface PageProps {
    params: {
        id: string;
        lang: string;
    };
}

export const createServerSupabaseClient = () => {
    return createServerComponentClient<Database>({ cookies })
}

const getSurveyData = async (id: string) => {
    const supabase = createServerSupabaseClient();

    const { data } = await supabase.from("resultadoformulario").select("idvisita, status").eq("id", id).limit(1)

    if (data && !data[0].status) {
        const resultado = await supabase.rpc("obter_dados_survey", { visita_id: data[0].idvisita })

        return ({
            formularioresposta: data,
            visita: resultado
        })
    }

    return ({
        formularioresposta: data
    })
}

export default async function Survey({ params: { id, lang } }: PageProps) {
    const surveyData = await getSurveyData(id);

    const dict: Dictionaries = await getDictionary(lang);
    const survey = dict.survey;

    return (
        <div className="w-full h-fit min-h-screen bg-branco dark:bg-dark-200 ">
            <nav className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 ">
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
            <div className="space-y-6 sm:mx-auto w-full lg:w-2/3 lg:min-w-[900px] px-4 md:px-12 ">
                <div className="relative z-0 w-full group py-4">
                    <CardRoot className="h-full px-3 md:px-0">
                        <div className="my-2 mx-2 md:my-4 md:mx-8 ">
                            {
                                !surveyData.formularioresposta ?
                                    <h1 className="text-xl md:text-2xl my-2 md:my-4 text-center">
                                        {survey.nosurveyfound}
                                    </h1>
                                    :
                                    surveyData.formularioresposta[0].status ?
                                        <>
                                            <div className="text-justify lg:text-start">
                                                <h1 className="text-xl md:text-2xl my-2 md:my-4">
                                                    {survey.thanksforanswering}
                                                </h1>
                                                <div className="text-justify lg:text-start">
                                                    <p>{survey.bestregards + ","}</p>
                                                    <p>ImmobileLink</p>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <h1 className="text-xl md:text-2xl my-2 md:my-4">
                                                {survey.dear + " " + surveyData.visita!.data![0].cliente}
                                            </h1>
                                            <h2 className="text-lg md:text-xl my-2 md:my-4">
                                                {survey.welcome}
                                            </h2>
                                            <div className="text-justify lg:text-start">
                                                <p className="pb-2">
                                                    {survey.referenceday + " "}
                                                    <span className="font-bold">{formataDataSemHora(surveyData.visita!.data![0].datavisita) + " "}</span>
                                                    {survey.referencebroker + " "}
                                                    <span className="font-bold">{surveyData.visita!.data![0].corretor + ", "}</span>
                                                    {survey.referencecompany + " "}
                                                    <span className="font-bold">{surveyData.visita!.data![0].corporacao + "."}</span>
                                                </p>
                                                <p>{survey.explanationsurveysite1}</p>
                                                <p className="pb-8">{survey.explanationsurveysite2}</p>
                                            </div>
                                            <SurveyForm survey={survey} id={id} />
                                        </>
                            }
                        </div>
                    </CardRoot>
                </div>
            </div>
        </div>
    );
}
