"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Dữ liệu cho biểu đồ
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Sales (in USD)",
      data: [150, 200, 300, 400, 500, 600],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      tension: 0.4, // Độ cong của đường (0 là đường thẳng)
      fill: true, // Làm đầy dưới đường
    },
  ],
};

// Các tùy chọn cho biểu đồ
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Monthly Sales Overview",
    },
  },
};

const LineChart: React.FC = () => {
  return (
    <div className="w-full max-h-96">
      <h2>Line Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
