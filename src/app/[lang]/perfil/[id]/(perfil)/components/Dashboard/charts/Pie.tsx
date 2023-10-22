"use client";

import Chart from 'chart.js/auto';
import { Pie as P } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);


interface PieProps {}

export default function Pie({}: PieProps) {

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
    <>
      <P data={data}/>
    </>
  );
}
