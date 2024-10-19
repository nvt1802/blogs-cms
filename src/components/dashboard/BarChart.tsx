import React from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Đăng ký các thành phần cần thiết
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      // legend: {
      //   position: 'top',
      // },
      title: {
        display: true,
        text: 'Bar Chart',
      },
    },
  };

  return (
    <div>
      <h2>Bar Chart</h2>
      <Bar data={data} options={options} className="max-h-80"/>
    </div>
  );
};

export default BarChart;
