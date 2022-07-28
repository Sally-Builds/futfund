import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import BarChart from "../../../components/Charts/Barchart/index";
// import ProjectModal from "../../../components/ProjectModal";
import { adminAddress } from "../../../store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import DatePicker from "react-date-picker";
Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,0.5)";

const Admin = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.pSlice);
  useEffect(() => {
    dispatch(adminAddress());
  }, [dispatch]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [newProject, setProject] = useState({
    name: "",
    expectedAmt: 0,
    startDate: "",
    endDate: "",
  });
  const [startDate, setStartDate] = useState(new Date());

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

  const submitForm = () => {
    console.log(newProject);
  };

  Modal.setAppElement("#root");
  return (
    <>
      <div className="p-2">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3 pa-md">
            <BarChart projects={projects} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-info rounded h-32">
              <div className="card-title text-2xl text-white text-center">
                Account Balance
              </div>
              <div className="pt-4 text-center text-xl text-white">
                0.018473 ethers
              </div>
            </div>

            <div className="bg-info rounded">
              <div className="card-title text-2xl text-white text-center">
                Total Projects
              </div>
              <div className="pt-4 text-center text-xl text-white">10</div>
            </div>

            <div className="bg-warning rounded">
              <div className="card-title text-2xl text-white text-center">
                Ongoing Projects
              </div>
              <div className="pt-4 text-center text-xl text-white">10</div>
            </div>

            <div className="bg-pri rounded">
              <div className="card-title text-2xl text-white text-center">
                Upcoming Projects
              </div>
              <div className="pt-4 text-center text-xl text-white">10</div>
            </div>
          </div>
        </div>
        <button
          onClick={openModal}
          className="absolute bottom-8 right-8 shadow-md bg-blue-500 text-white rounded-full w-12 h-12 justify-center"
        >
          Add
        </button>
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          Create New Funding
          <div>
            <label className="text-gray-500 text-sm font-bold m-2">
              <span>Project Name</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full m-2 p-3 text-gray-700 
      leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Hostel Renovation"
              value={newProject.name}
              onChange={(e) => setProject({ name: e.target.value })}
            />
            {/* <span className="text-sm text-red-600 font-light m-2 p-3">
              {error}
            </span> */}
          </div>
          <div>
            <label className="text-gray-500 text-sm font-bold m-2">
              <span>Expected Amount</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full m-2 p-3 text-gray-700 
      leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Hostel Renovation"
              value={newProject.expectedAmt}
              onChange={(e) => setProject({ expectedAmt: e.target.value })}
            />
            {/* <span className="text-sm text-red-600 font-light m-2 p-3">
              {error}
            </span> */}
          </div>
          <div>
            <label className="text-gray-500 text-sm font-bold m-2">
              <span>Start Date</span>
            </label>
            <DatePicker onChange={setStartDate} value={startDate} />
          </div>
          <div className="pt-4">
            <label className="text-gray-500 text-sm font-bold m-2">
              <span>End Date</span>
            </label>
            <DatePicker onChange={setStartDate} value={startDate} />
          </div>
          <div className="">
            <button
              className="rounded-md bg-primary text-white m-3 p-3"
              onClick={submitForm}
            >
              Submit
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Admin;
