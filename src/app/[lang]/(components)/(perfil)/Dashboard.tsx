"use client";

import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);


interface DashboardProps {
    userId: any;
}

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

export default function Dashboard({userId}: DashboardProps) {
   
    
     
      return (
        <div className='blur-sm'>
            <Line data={data} />

            <p className='mt-5'>Tacar mais alguma informação aqui pertinente ao desempenho</p>
      </div>
      );
}
