"use client";
import Chart from 'chart.js/auto';
import { PolarArea as Po } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import { useProfileStore } from '../../../../../../../../../lib/store/profileStore';
Chart.register(CategoryScale);
interface PolarAreaProps {
}


export default function PolarAreaMock({}: PolarAreaProps) {

    const dict = useProfileStore.getState().dict!

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
