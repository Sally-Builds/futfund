import React from "react";

const Table = ({ upcomingProjects }) => {
  return (
    <div className="rounded-md">
      <table className="border-separate border border-slate-400 ... w-full border-spacing-2 max-h-12">
        <thead>
          <tr>
            <th className="border border-slate-300 ...">#</th>
            <th className="border border-slate-300 ...">Project Name</th>
            <th className="border border-slate-300 ...">Expected Amount</th>
            <th className="border border-slate-300 ...">Start Date</th>
            <th className="border border-slate-300 ...">End Date</th>
          </tr>
        </thead>
        <tbody>
          {upcomingProjects.map((el, i) => (
            <tr>
              <td className="border border-slate-300 ..."> {i + 1} </td>
              <td className="border border-slate-300 ..."> {el.name} </td>
              <td className="border border-slate-300 ...">
                {el.expectedAmt} ether
              </td>
              <td className="border border-slate-300 ...">{el.startDate}</td>
              <td className="border border-slate-300 ...">{el.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
