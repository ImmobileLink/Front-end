"use client";

import Chart from 'chart.js/auto';
import { Line as Li } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

interface LineProps {}

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Visitas em imóveis",
      backgroundColor: "#2A3A49",
      borderColor: "#2A3A49",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
    {
      label: "Vendas",
      backgroundColor: "#3f9236",
      borderColor: "#3f9236",
      data: [0, 2, 1, 0, 4, 3, 5],
    }
  ],
};

export default function Line({}: LineProps) {
  return (
    <>
      <Li data={data} />
    </>
  );
}
