import React from "react";
import { Doughnut } from "react-chartjs-2";

const Douchart = ({ donations }) => {
  const data = {
    // labels: ["Red", "Blue", "Yellow"],
    labels: donations.map((el) => el.projectName),
    datasets: [
      {
        label: "My First Dataset",
        // data: [300, 50, 100],
        data: donations.map((el) => el.amount),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
        borderWidth: 0.5,
      },
    ],
  };
  return (
    <div className="">
      <Doughnut
        data={data}
        width="500px"
        height={"350px"}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default Douchart;
