"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const CardBarChart = () => {
  const currentYear = new Date().getFullYear();

  const data: ChartData<"bar"> = {
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
        backgroundColor: "#ed64a6",
        borderColor: "#ed64a6",
        data: [30, 78, 56, 34, 100, 45, 13],
        borderRadius: 4,
        barThickness: 8,
      },
      {
        label: `${currentYear - 1}`,
        backgroundColor: "#4c51bf",
        borderColor: "#4c51bf",
        data: [27, 68, 86, 74, 10, 4, 87],
        borderRadius: 4,
        barThickness: 8,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: "Orders Chart",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      legend: {
        display: true,
        align: "end",
        position: "bottom",
        labels: {
          color: "rgba(0,0,0,.4)",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
    },
    interaction: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: false,
        title: {
          display: true,
          text: "Month",
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        title: {
          display: false,
          text: "Value",
        },
        grid: {
          color: "rgba(33, 37, 41, 0.2)",
        },
        border: {
          display: false,
          dash: [2, 2],
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg">
      <div className="mb-0 rounded-t bg-transparent px-4 py-3">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-1">
            <h6 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Performance
            </h6>

            <h2 className="text-xl font-semibold text-slate-700">
              Total orders
            </h2>
          </div>
        </div>
      </div>

      <div className="flex-auto p-4">
        <div className="relative h-[350px] w-full">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};
