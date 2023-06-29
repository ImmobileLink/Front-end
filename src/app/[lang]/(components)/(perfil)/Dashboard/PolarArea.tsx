"use client";
import Chart from 'chart.js/auto';
import { PolarArea as Po } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);
interface PolarAreaProps {
  dict: any;
}


export default function PolarArea({dict}: PolarAreaProps) {

  const data = {
    labels: [
      dict.dashboard.domain,
      dict.dashboard.professionalism,
      dict.dashboard.goodService,
      dict.dashboard.educated,
    ],
    datasets: [{
      label: 'dasda',
      data: [41, 81, 66, 54],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
      ]
    }]
  };

  return (
    <>
        <Po data={data}></Po>
    </>
  );
}
