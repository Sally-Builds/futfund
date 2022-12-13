import React from "react";
import { Doughnut } from "react-chartjs-2";

const Douchart = ({ donations }) => {
  const data = {
    labels: donations.map((el) => el.projectName),
    datasets: [
      {
        label: "My First Dataset",
        data: donations.map((el) => el.amount),
        backgroundColor: [
          "rgb(184, 225, 255)",
          "rgb(226, 201, 245)",
          "rgb(109, 72, 112)",
          "rgb(130, 168, 250)",
          "rgb(143, 79, 40)",
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
