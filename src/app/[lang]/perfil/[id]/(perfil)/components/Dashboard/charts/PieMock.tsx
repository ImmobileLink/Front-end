"use client";

import Chart from 'chart.js/auto';
import { Pie as P } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import { DashboardOptions } from '@/app/i18n/dictionaries/types';
Chart.register(CategoryScale);


interface PieProps {
  dict: DashboardOptions;
}



export default function PieMock({dict}: PieProps) {

    const data = {
        labels: [dict.verysatisfied, dict.satisfied, dict.neutral, dict.dissatisfied, dict.verydissatisfied],
        datasets: [
          {
            data: [32, 21, 13, 2, 2],
            backgroundColor: ['#114f08', '#5cc063', '#c0bbbb', '#793d3d', '#870b0b'],
          },
        ],
      };


  return (
    <>
      <P data={data}/>
    </>
  );
}
