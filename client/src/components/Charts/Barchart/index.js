import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ projects }) => {
  const datasets = {
    labels: projects.map((el) => el.name),
    datasets: [
      {
        label: "Expected Amount",
        data: projects.map((el) => el.expectedAmt),
        backgroundColor: "rgba(124, 181, 236, 0.9)",
        borderColor: "rgb(124, 181, 236)",
        borderWidth: 1,
      },
      {
        label: "Realized Amount",
        data: projects.map((el) => el.realizeAmt),
        backgroundColor: "rgba(67, 67, 72, 0.9)",
        borderColor: "rgb(67, 67, 72)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
      },
    },
    scales: {
      // yAxes: [
      //   {
      //     ticks: {
      //       min: 0,
      //       max: 80,
      //       stepSize: 20,
      //     },
      //     scaleLabel: {
      //       display: true,
      //       labelString: "Percent (%)",
      //     },
      //   },
      // ],
      // xAxes: [
      //   {
      //     gridLines: {
      //       drawOnChartArea: false,
      //     },
      //   },
      //   {
      //     offset: true,
      //     ticks: {
      //       autoSkip: false,
      //       maxRotation: 0,
      //       padding: -15,
      //       callback: (v, i) => {
      //         if (i === 1) {
      //           return "Total";
      //         } else if (i === 4) {
      //           return "Lower than 2.50";
      //         } else {
      //           return "";
      //         }
      //       },
      //     },
      //     gridLines: {
      //       drawOnChartArea: false,
      //       offsetGridLines: true,
      //       tickMarkLength: 20,
      //       color: [
      //         "white",
      //         "white",
      //         "white",
      //         "lightgray",
      //         "white",
      //         "white",
      //         "lightgray",
      //       ],
      //     },
      //   },
      // ],
    },
  };
  return (
    <div>
      <Bar data={datasets} options={options} />
    </div>
  );
};

export default BarChart;
