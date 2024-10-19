"use client"

import React from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ['Admin', 'Author', 'User'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="w-full max-h-96">
      <h2>Pie Chart</h2>
      <Pie data={data} className="!max-h-72" />
    </div>
  );
};

export default PieChart;

