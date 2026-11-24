"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const CardLineChart = () => {
  const currentYear = new Date().getFullYear();

  const data: ChartData<"line"> = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
    ],
    datasets: [
      {
        label: `${currentYear}`,
        backgroundColor: "#4c51bf",
        borderColor: "#4c51bf",
        data: [65, 78, 66, 44, 56, 67, 75],
        fill: false,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: `${currentYear - 1}`,
        backgroundColor: "#fff",
        borderColor: "#fff",
        data: [40, 68, 86, 74, 56, 60, 87],
        fill: false,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: "Sales Charts",
        color: "#fff",
      },
      legend: {
        display: true,
        align: "end",
        position: "bottom",
        labels: {
          color: "#fff",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    interaction: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        ticks: {
          color: "rgba(255,255,255,.7)",
        },
        title: {
          display: false,
          text: "Month",
          color: "#fff",
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        ticks: {
          color: "rgba(255,255,255,.7)",
        },
        title: {
          display: false,
          text: "Value",
          color: "#fff",
        },
        grid: {
          color: "rgba(255,255,255,0.15)",
        },
        border: {
          display: false,
          dash: [3, 3],
        },
      },
    },
  };

  return (
    <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-slate-700 shadow-lg">
      <div className="mb-0 rounded-t bg-transparent px-4 py-3">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-1">
            <h6 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-200">
              Overview
            </h6>

            <h2 className="text-xl font-semibold text-white">
              Sales value
            </h2>
          </div>
        </div>
      </div>

      <div className="flex-auto p-4">
        <div className="relative h-[350px] w-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};
