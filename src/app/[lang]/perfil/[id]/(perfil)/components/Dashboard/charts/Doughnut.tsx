"use client";
import { Doughnut as D } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

interface DoughnutProps { }

export default function Doughnut({ }: DoughnutProps) {
    const data = {
        labels: ['Casas', 'Casas', 'Casas'],
        datasets: [
            {
                data: [30, 40, 20],
                backgroundColor: ['red', 'yellow', 'orange'],
            },
        ],
    };

    return (
        <div>
            <D data={data} />
        </div>
    );
}
