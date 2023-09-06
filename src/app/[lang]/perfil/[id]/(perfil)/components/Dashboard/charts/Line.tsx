"use client";

import Chart from 'chart.js/auto';
import { Line as Li } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

interface LineProps {
  dict: any;
}




export default function Line({dict}: LineProps) {
  
const labels = [dict.dashboard.january, dict.dashboard.february
  , dict.dashboard.march, dict.dashboard.april, 
  dict.dashboard.may, dict.dashboard.june];

  const data = {
  labels: labels,
  datasets: [
    {
      label: dict.dashboard.visited,
      backgroundColor: "#2A3A49",
      borderColor: "#2A3A49",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
    {
      label: dict.dashboard.sales,
      backgroundColor: "#3f9236",
      borderColor: "#3f9236",
      data: [0, 2, 1, 0, 4, 3, 5],
    }
  ],
};
  return (
    <>
      <Li data={data} />
    </>
  );
}
