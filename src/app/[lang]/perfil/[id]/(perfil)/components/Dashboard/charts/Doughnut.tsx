"use client";
import { Doughnut as D } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Dashboard4 } from 'lib/modelos';
import { DashboardOptions } from '@/app/i18n/dictionaries/types';
Chart.register(CategoryScale);


type Imovel = {
    descricao: string;
    id: string;
    quantidade: number;
}

type Descricao = {
    descricao: Imovel[]
}

type DoughnutProps = {
    dict: DashboardOptions;
    data4: any; 
};


export default function Doughnut({ dict, data4 }: DoughnutProps) {

    const uniqueDescriptionsArray: Imovel[] = [];
    const idCounts: Record<string, Imovel> = {};

    data4!.forEach((visita: Descricao) => {
        visita.descricao.forEach((imovel : Imovel) => {
            const itemId = imovel.id;

            if (idCounts[itemId]) {
                idCounts[itemId].quantidade++;
            } else {
                idCounts[itemId] = { ...imovel, quantidade: 1 };
                uniqueDescriptionsArray.push(idCounts[itemId]);
            }
        })
    });

    // Ordenar os itens por quantidade em ordem decrescente
    const sortedItems = Object.values(idCounts).sort((a, b) => b.quantidade - a.quantidade);

    // Pegar os 4 itens com maior quantidade
    const top4Items = sortedItems.slice(0, 5);

    // Somar a quantidade dos outros itens
    const outrosQuantidade = sortedItems.slice(5).reduce((acc, item) => acc + item.quantidade, 0);

    // Criar os rótulos e dados para o gráfico
    const labels = top4Items.map((item) => item.descricao);
    const data = top4Items.map((item) => item.quantidade);
    labels.push(dict.others);
    data.push(outrosQuantidade);


    const backgroundColor = ['#0074D9', '#2ECC40', '#FF4136', '#FFDC00','#9000ff', 'gray']; // Adicione cores para cada item e 'outros'

    const chartData = {
        labels,
        datasets: [
          {
            data,
            backgroundColor,
          },
        ],
      };

    return (
        <div className='flex flex-col justify-center items-center gap-3'>
            <D data={chartData} />
        </div>
    );
}
