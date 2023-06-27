"use client";
import Chart from 'chart.js/auto';
import { PolarArea as Po } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);
interface PolarAreaProps {}

const data = {
    labels: [
      'Domínio',
      'Profissionalismo',
      'taltal',
      'taltal',
      'taltal'
    ],
    datasets: [{
      label: 'dasda',
      data: [11, 16, 7, 3, 14],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)'
      ]
    }]
  };

export default function PolarArea({}: PolarAreaProps) {
  return (
    <>
        <Po data={data}></Po>
    </>
  );
}
