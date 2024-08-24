import React from "react";
import Sidebar from "../components/Home/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row h-[100%] md:h-[98vh] gap-4 p-4">
      <div className="w-full lg:w-1/6 border border-purple-200 rounded-xl p-4 flex flex-col justify-between bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-lg">
        <Sidebar />
      </div>
      <div className="w-full lg:w-5/6 border border-purple-200 rounded-xl p-4 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
