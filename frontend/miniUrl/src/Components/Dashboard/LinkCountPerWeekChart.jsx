import React from 'react';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Tooltip,Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const LinkCountPerWeekChart = ({ urlsCreatedLast7Days = [] }) => {
  const labels = urlsCreatedLast7Days.map(item =>
    new Date(item.day).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short'
    })
  );

  const dataValues = urlsCreatedLast7Days.map(
    item => item.urls_created
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'URLs Created',
        data: dataValues,
        backgroundColor: '#111827', // gray-900
        borderRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 }
      }
    }
  };

  return (
    <div className="bg-white border rounded-lg p-4 h-64 shadow-sm">
      <h2 className="text-sm font-semibold mb-3">
        URLs Created (Last 7 Days)
      </h2>

      <Bar data={data} options={options} />
    </div>
  );
};

export default LinkCountPerWeekChart;
