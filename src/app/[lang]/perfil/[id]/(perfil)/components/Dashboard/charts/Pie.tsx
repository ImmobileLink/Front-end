import Chart from 'chart.js/auto';
import { Pie as P } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import { Dashboard2 } from '../../../../../../../../../lib/modelos';
Chart.register(CategoryScale);

interface PieProps {
  satisfacao: Dashboard2
}

export default function Pie({ satisfacao }: PieProps) {
  const sat = satisfacao![0];

  const data = {
    labels: ['Muito Satisfeito', 'Satisfeito', 'Neutro', 'Insatisfeito', 'Muito Insatisfeito'],
    datasets: [
      {
        data: [sat.muito_satisfeito, sat.satisfeito, sat.neutro, sat.insatisfeito, sat.muito_insatisfeito],
        backgroundColor: [
          'rgba(50, 205, 50, 0.6)',   // Muito Satisfeito com transparência
          'rgba(107, 142, 35, 0.6)',  // Satisfeito com transparência
          'rgba(128, 128, 128, 0.6)', // Neutro com transparência
          'rgba(205, 92, 92, 0.6)',  // Insatisfeito com transparência
          'rgba(139, 0, 0, 0.6)',    // Muito Insatisfeito com transparência
        ],
      },
    ],
  };

  return (
    <P data={data} />
  );
}
