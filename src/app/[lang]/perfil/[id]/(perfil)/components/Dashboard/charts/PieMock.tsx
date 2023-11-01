"use client";

import Chart from 'chart.js/auto';
import { Pie as P } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);


interface PieProps {
}



export default function PieMock({}: PieProps) {

    const data = {
        labels: ['Muito Satisfeito', 'Satisfeito', 'Neutro', 'Insatisfeito', 'Muito Insatisfeito'],
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
