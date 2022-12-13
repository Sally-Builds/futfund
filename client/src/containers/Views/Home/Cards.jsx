import React from "react";
import Card from "../../../components/Card/index";

const Cards = ({ projects }) => {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-10 mt-10">
        {projects.map((project, index) => (
          <Card project={project} index={index} key={project.name} />
        ))}
      </div>
    </>
  );
};

export default Cards;
