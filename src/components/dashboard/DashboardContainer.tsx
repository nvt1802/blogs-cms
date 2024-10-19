"use client";

import LineChart from "@/components/dashboard/LineChart";
import BarChart from "@/components/dashboard/BarChart";
import PieChart from "@/components/dashboard/PieChart";

const DashboardContainer = () => {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 overflow-y-auto h-[80vh]">
      <LineChart />
      <PieChart />
      <BarChart />
    </div>
  );
};

export default DashboardContainer;
