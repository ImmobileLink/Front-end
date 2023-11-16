import { DashboardOptions } from "@/app/i18n/dictionaries/types";
import Chart from "chart.js/auto";
import { Dashboard3 } from "lib/modelos";
import { PolarArea } from "react-chartjs-2";

interface PolarAreaProps {
    data3: Dashboard3;
    dict: DashboardOptions;
}

export default function PolarAreaChart({ dict, data3 }: PolarAreaProps) {
    const taxa = data3![0];

    const sum = taxa.indeciso + taxa.intencao + taxa.sem_interesse;
    const indeciso = (100 / sum) * taxa.indeciso;
    const intencao = (100 / sum) * taxa.intencao;
    const sem_interesse = (100 / sum) * taxa.sem_interesse;

    const data = {
        labels: [dict.interested, dict.undecided, dict.notinterested],
        datasets: [
            {
                data: [intencao, indeciso, sem_interesse], // Porcentagens para cada tipo
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6",
                ], // Cores com transparência
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false, // Ocultar a legenda
            },
        },
    };

    return (
        <div>
            <PolarArea data={data} options={options} />
        </div>
    );
}
