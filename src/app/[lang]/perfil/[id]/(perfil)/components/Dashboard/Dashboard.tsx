"use client";
import Line from "./charts/Line";
import PolarArea from "./charts/PolarArea";
import Link from "next/link";
import { useProfileStore } from "../../../../../../../../lib/store/profileStore";
import { useEffect, useMemo, useState } from "react";
import Radar from "./charts/Radar";
import Doughnut from "./charts/Doughnut";
import Pie from "./charts/Pie";
import DashboardSkeleton from "../loading/DashboardSkeleton";
import {
    getDataDashboard1,
    getDataDashboard2,
    getDataDashboard3,
    getDataDashboard4,
} from "../../../perfilUtils/Dashboard";
import {
    Dashboard1,
    Dashboard2,
    Dashboard3,
    Dashboard4,
} from "../../../../../../../../lib/modelos";
import PieMock from "./charts/PieMock";
import PolarAreaMock from "./charts/PolarAreaMock";
import { clientSupabase } from "lib/utils/clientSupabase";
import { Dashboard, Profile } from "@/app/i18n/dictionaries/types";

interface DashboardProps {
    dict: Dashboard;
}

export default function Dashboard({ dict }: DashboardProps) {
    const supabase = clientSupabase();
    const state = useProfileStore.getState();
    const premium = state.sessionData?.isPremium;
    const isLogged = state.sessionData?.id;
    const id = state.profileData?.id!;

    const [openCalendar, setOpenCalendar] = useState(false);

    const [data1, setData1] = useState<Dashboard1>(null);
    const [data2, setData2] = useState<Dashboard2>(null);
    const [data3, setData3] = useState<Dashboard3>(null);
    const [data4, setData4] = useState<Dashboard4>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            let { data1 } = await getDataDashboard1(id, supabase);
            let { data2 } = await getDataDashboard2(id, supabase);
            let { data3 } = await getDataDashboard3(id, supabase);
            let { data4 } = await getDataDashboard4(id, supabase);
            setData1(data1);
            setData2(data2);
            setData3(data3);
            setData4(data4);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    return (
        <>
            {!premium ? (
                <div>
                    <div className="absolute blur-md inset-0 overflow-hidden">
                        <PieMock dict={dict.options}/>
                        <PolarAreaMock />
                    </div>
                    <div className="absolute flex justify-center items-center inset-0">
                        <div className="w-3/4 flex justify-center flex-col items-center">
                            {!isLogged ? (
                                <>
                                    <p className="text-center font-semibold mb-3">
                                        {dict.logintoseemore}
                                    </p>
                                    <Link
                                        href="/auth"
                                        className="w-32 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        {dict.login}
                                    </Link>
                                    <Link
                                        href="/auth"
                                        className="w-32 mt-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        {dict.signup}
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <p className="text-center font-semibold mb-3 text-black">
                                        {dict.wantmoredetails} <br />
                                    </p>
                                    <Link
                                        href="/plano"
                                        className="w-32 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        {dict.seeplans}
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className={`${
                        !openCalendar && "max-h-[380px] md:max-h-[600px]"
                    } min-h-[300px]`}
                >
                    {isLoading && <DashboardSkeleton />}
                    {data1 && data1.length >= 1 ? (
                        <div>
                            <div className="flex flex-col mb-16">
                                <div className="bg-slate-300 py-5 px-3 flex items-center flex-col text-black font-bold text-xl gap-3">
                                    <h2>{dict.features}</h2>
                                    <Radar dict={dict.options} avaliacao={data1} />
                                </div>
                                <div className="bg-slate-400 py-5 px-3 flex items-center flex-col text-black font-bold text-xl gap-3">
                                    <h2 className="text-center">
                                        {dict.satisfaction}
                                    </h2>
                                    <Pie dict={dict.options} satisfacao={data2} />
                                </div>

                                <div className="bg-slate-300 py-5 px-3 flex items-center flex-col text-black font-bold text-xl gap-3">
                                    <h2>{dict.type}</h2>
                                    <Doughnut dict={dict.options} data4={data4} />
                                </div>

                                <div className="bg-slate-400 py-5 px-3 flex items-center flex-col text-black font-bold text-xl gap-3">
                                    <h2 className="text-center">
                                        {dict.interest}
                                    </h2>
                                    <PolarArea dict={dict.options} data3={data3} />
                                </div>
                            </div>

                            <div
                                className={`flex items-center justify-center absolute bottom-0 w-full right-0 bg-gradient-to-b from-transparent to-opacity-100 via-yellow-400 to-yellow-700 h-14`}
                            >
                                <Link
                                    href="#dashboard"
                                    onClick={() =>
                                        setOpenCalendar(!openCalendar)
                                    }
                                    className="cursor-pointer text-white font-bold mt-4"
                                >
                                    {openCalendar ? dict.seeless : dict.seemore}
                                </Link>
                            </div>
                        </div>
                    ) : (
                        !isLoading && (
                            <div className="">
                                <p className="text-center text-black text-xl font-bold absolute inset-0 z-10 flex justify-center items-center ">
                                    {dict.noreviews}
                                </p>
                                <div className="absolute blur-lg inset-0 overflow-hidden ">
                                    <PieMock dict={dict.options}/>
                                    {/* <PolarAreaMock /> */}
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </>
    );
}
