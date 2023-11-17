"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Chart from "chart.js/auto";
import { Radar as R } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Dashboard1 } from "lib/modelos";
import { DashboardOptions } from "@/app/i18n/dictionaries/types";

Chart.register(CategoryScale);

interface RadarProps {
    avaliacao: Dashboard1;
    dict: DashboardOptions;
}

Chart.defaults.color = "#000";

export default function Radar({ dict, avaliacao }: RadarProps) {
    const aval = avaliacao![0];

    const data = {
        labels: [
            dict.professionalism,
            dict.communication,
            dict.knowlodge,
            dict.clarity,
            dict.transparency,
            dict.detail,
        ],
        datasets: [
            {
                label: dict.scores,
                data: [
                    aval.profissionalismo,
                    aval.comunicacao,
                    aval.conhecimento,
                    aval.clareza,
                    aval.transparencia,
                    aval.detalhista,
                ],
                backgroundColor: "rgba(75, 192, 192, 0.6)", // Cor de preenchimento do gráfico
                borderColor: "rgba(75, 192, 192, 1)", // Cor da borda do gráfico
            },
        ],
    };

    const options = {
        scale: {
            angleLines: {
                display: true,
            },
            ticks: {
                beginAtZero: true,
                min: 0,
                max: 5,
                stepSize: 0.5,
            },
        },
    };

    return (
        <>
            <R data={data} />
        </>
    );
}
