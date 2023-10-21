"use client";

import Chart from 'chart.js/auto';
import { Radar as R } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

interface RadarProps {
}




export default function Radar({ }: RadarProps) {

    const data = {
        labels: ['Habilidade 1', 'Habilidade 2', 'Habilidade 3', 'Habilidade 4', 'Habilidade 5'],
        datasets: [
          {
            label: 'Pontuações',
            data: [80, 70, 60, 90, 75],
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Cor de preenchimento do gráfico
            borderColor: 'rgba(75, 192, 192, 1)', // Cor da borda do gráfico
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
            max: 100,
            stepSize: 20,
          },
        },
      };

    return (
        <>
            <R data={data} />
        </>
    );
}
