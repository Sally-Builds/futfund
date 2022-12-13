import React from "react";
import { CalendarIcon } from "@heroicons/react/outline";
import Cards from "./Cards";
import carousel from "../../../assets/img/carousel1.jpg";

const Home = ({ projects }) => {
  return (
    <>
      <div className="grid">
        <div className="carousel relative">
          <div className="carousel-img">
            <img
              src={carousel}
              alt=""
              className="w-full object-cover h-screen"
            />
          </div>
          <div className="carousel-body absolute top-1/3 m-2 grid grid-cols-3">
            <div className="col-span-2 p-4">
              <h3 className="text-5xl font-light text-gray-200 font-body">
                Futo Decentralized Crowdfunding
              </h3>
              <p className="font-body text-gray-400 pt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas impedit cumque sunt, ut beatae itaque provident ratione
                et assumenda obcaecati, perspiciatis veniam numquam quo
                consequuntur explicabo dicta expedita atque amet?
              </p>
              <div className="m-3">
                <button
                  className="m-2 font-semibold text-gray-200 uppercase text-sm 
                hover:text-gray-400 hover:bg-white bg-primary border-primary p-2 rounded-full tracking-wider pl-2 pr-2"
                >
                  Get Started
                </button>

                <button
                  className="m-2 font-semibold text-gray-600 uppercase text-sm 
                hover:text-gray-400 hover:bg-blue-200 bg-white border-primary p-2 rounded-full tracking-wider pl-2 pr-2"
                >
                  About FutFund
                </button>
              </div>
            </div>
          </div>
        </div>

        <section className="m-5">
          <div className="mt-12">
            <div className="flex justify-start">
              <CalendarIcon className="w-4 inline-block mr-2 stroke-secondary-200"></CalendarIcon>
              <h4 className="text-primary">Upcoming Crowdfunding</h4>
            </div>

            <Cards projects={projects} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
