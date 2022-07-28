import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table";
import BarChart from "../../../components/Charts/Barchart/index";
import Douchart from "../../../components/Charts/Dougnut";
import { useDispatch, useSelector } from "react-redux";
import { getDonations } from "../../../store/donations/dSlice";
import { upcomingProjects } from "../../../store/projects/pSlice";

const Donation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.authSlice);
  const { isLoading, isSuccess, isError, myDonations } = useSelector(
    (state) => state.dSlice
  );
  const { projects } = useSelector((state) => state.pSlice);
  useEffect(() => {
    dispatch(getDonations());
    // if (isLoading) {
    //   console.log("loading");
    // }

    if (!isLoggedIn && isSuccess) {
      navigate("/");
    }

    if (isError) {
      navigate("/");
    }
  }, [isLoggedIn, isSuccess, isError, dispatch, navigate]);

  console.log(myDonations, "donation");
  const upcoming = useSelector(upcomingProjects);
  return (
    <>
      <div className="p-2">
        <div className="grid md:grid-cols-3 gap-2 pb-4">
          <div className="shadow-xl p-2 bg-blue-200 rounded-md col-span-2">
            <BarChart projects={projects} />
          </div>
          <div className="rounded-lg bg-white max-w-sm text-center flex flex-col">
            <div className="shadow-xl bg-purple-400 rounded-md col-span-2">
              <Douchart donations={myDonations} />
            </div>
          </div>
        </div>

        <div className="pt-4 p-12">
          <div className="block rounded-lg bg-white text-center">
            <div className="text-center text-gray-700 p-2">
              Upcoming Project Funding
            </div>
            <Table upcomingProjects={upcoming} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Donation;
