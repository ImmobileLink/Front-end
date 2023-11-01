"use client";

import Chart from 'chart.js/auto';
import { Pie as P } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import { Dashboard2 } from '../../../../../../../../../lib/modelos';
Chart.register(CategoryScale);


interface PieProps {
  satisfacao: Dashboard2
}



export default function Pie({satisfacao}: PieProps) {

    const sat = satisfacao![0]
    const data = {
        labels: ['Muito Satisfeito', 'Satisfeito', 'Neutro', 'Insatisfeito', 'Muito Insatisfeito'],
        datasets: [
          {
            data: [sat.muito_satisfeito, sat.satisfeito, sat.neutro, sat.insatisfeito, sat.muito_insatisfeito],
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
