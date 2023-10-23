"use client";
import { Doughnut as D } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

interface DoughnutProps { }

export default function Doughnut({ }: DoughnutProps) {
    const data = {
        labels: ['Maçãs', 'Bananas', 'Laranjas'],
        datasets: [
            {
                data: [30, 40, 20],
                backgroundColor: ['red', 'yellow', 'orange'],
            },
        ],
    };

    return (
        <div>
            <h2>Gráfico de Rosca</h2>
            <D data={data} />
        </div>
    );
}
