import React from "react";
import { ClockIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDonation, reset } from "../../store/donations/dSlice";
import { toast } from "react-toastify";

const Card = ({ project, index }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { message, isError, isSuccess, isLoading } = useSelector(
    (state) => state.dSlice
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      setValue("");
    }
    if (isSuccess) {
      toast.success(message);
      setValue("");
    }
    dispatch(reset());
  }, [message, isError, isSuccess, isLoading, dispatch]);

  const sendValue = () => {
    const data = {
      index,
      value,
    };
    dispatch(createDonation(data));
  };

  return (
    <>
      <div className="card">
        <div className="m-12">
          <span className="font-bold text-body text-gray-500">
            {project.name}
          </span>
          <span className="block text-sm font-extralight">
            {project.expectedAmt} ethers to be raised
          </span>
          <span className="block text-sm font-extralight">
            {project.realizeAmt} ethers donated
          </span>
          <div className="badge p-2">
            <ClockIcon className="w-4 inline-block stroke-white"></ClockIcon>{" "}
            {new Date(project.startDate * 1000).getDate() -
              new Date().getDate() <=
            0 ? (
              <>
                <span className="text-xs text-white font-bold">ongoing</span>
              </>
            ) : (
              <>
                <span className="text-xs text-white font-bold">
                  {new Date(project.startDate * 1000).getDate() -
                    new Date().getDate()}{" "}
                  day(s) to start
                </span>
              </>
            )}
          </div>

          {new Date(project.startDate * 1000).getDate() -
            new Date().getDate() <=
          0 ? (
            <div>
              <label className="text-gray-500 text-sm font-bold m-2">
                <span>Donate</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full m-2 p-3 text-gray-700 
              leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="5 wei"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <div className="p-2">
                <button
                  onClick={sendValue}
                  className="bg-primary p-2 rounded-full"
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
