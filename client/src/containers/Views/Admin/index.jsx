import React, { useEffect, useState } from "react";
import BarChart from "../../../components/Charts/Barchart/index";
import { getAdminAddress } from "../../../store/auth/authSlice";
import { createProject } from "../../../store/projects/pSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import DatePicker from "react-date-picker";
Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,0.5)";

const Admin = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.pSlice);
  useEffect(() => {
    dispatch(getAdminAddress());
  }, [dispatch]);

  const [modalIsOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [expectedAmt, setExpectedAmt] = useState("0");
  const [expectedAmtError, setExpectedAmtError] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startDateError, setStartDateError] = useState("");
  const [endDate, setEndDate] = useState(new Date());

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const submitForm = (e) => {
    e.preventDefault();

    setExpectedAmtError("");
    setNameError("");
    setStartDateError("");
    if (!name) {
      return setNameError("Please enter the project name");
    }
    if (expectedAmt <= 0) {
      return setExpectedAmtError("Must be greater than 1 ether");
    }

    if (Date.parse(startDate) < Date.parse(new Date())) {
      return setStartDateError("start cannot be in the past ");
    }

    if (Date.parse(endDate) <= Date.parse(startDate)) {
      return setStartDateError("start date must be nearer than end date ");
    }
    console.log(name);
    console.log(expectedAmt);
    const dateStart = calcDate(startDate);
    const dateEnd = calcDate(endDate);
    dispatch(
      createProject({
        name,
        expectedAmt,
        startDate: dateStart,
        endDate: dateEnd,
      })
    );
  };

  const calcDate = (date) => {
    const date1 = new Date();
    const date2 = new Date(date);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  Modal.setAppElement("#root");
  return (
    <>
      <div className="p-2">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3 pa-md">
            <BarChart projects={projects} />
          </div>
        </div>
        <button
          onClick={openModal}
          className="absolute bottom-8 right-8 shadow-md bg-blue-500 text-white mx-4 p-2 justify-center"
        >
          New Project
        </button>
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          Create New Project for Funding
          <form onSubmit={submitForm}>
            <div>
              <label className="text-gray-500 text-sm font-bold m-2">
                <span>Project Name</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full m-2 p-3 text-gray-700 
      leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Hostel Renovation"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span className="text-sm text-red-600 font-light m-2 p-3">
                {nameError}
              </span>
            </div>
            <div>
              <label className="text-gray-500 text-sm font-bold m-2">
                <span>Expected Amount(ether)</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full m-2 p-3 text-gray-700 
      leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="1 ether"
                value={expectedAmt}
                onChange={(e) => setExpectedAmt(e.target.value)}
              />
              <span className="text-sm text-red-600 font-light m-2 p-3">
                {expectedAmtError}
              </span>
            </div>
            <div>
              <label className="text-gray-500 text-sm font-bold m-2">
                <span>Start Date</span>
              </label>
              <DatePicker onChange={setStartDate} value={startDate} />
              <span className="text-sm text-red-600 font-light m-2 p-3">
                {startDateError}
              </span>
            </div>
            <div className="pt-4">
              <label className="text-gray-500 text-sm font-bold m-2">
                <span>End Date</span>
              </label>
              <DatePicker onChange={setEndDate} value={endDate} />
            </div>
            <div className="">
              <button
                className="rounded-md bg-primary text-white m-3 p-3"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Admin;
