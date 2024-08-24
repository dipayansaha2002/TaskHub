import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const Cards = ({ home, setInputDiv, data, setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `https://taskmanagement-jio0.onrender.com/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportant = async (id) => {
    try {
      const response = await axios.put(
        `https://taskmanagement-jio0.onrender.com/api/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id, title, desc) => {
    setInputDiv("fixed");
    setUpdatedData({ id: id, title: title, desc: desc });
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `https://taskmanagement-jio0.onrender.com/api/v2/delete-task/${id}`,
        { headers }
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
      {data &&
        data.map((items, i) => (
          <div
            className="flex flex-col justify-between bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-lg p-4 shadow-lg"
            key={i}
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{items.title}</h3>
              <p className="text-gray-600 my-2">{items.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                className={` ${
                  items.complete === false ? "bg-red-400" : "bg-green-400"
                } p-2 rounded-lg text-white text-sm w-3/6 transition-transform transform hover:scale-105`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete === true ? "Completed" : "Incomplete"}
              </button>
              <div className="text-gray-800 p-2 w-3/6 text-lg flex justify-around">
                <button
                  className="transition-transform transform hover:scale-105"
                  onClick={() => handleImportant(items._id)}
                >
                  {items.important === false ? (
                    <CiHeart className="text-gray-500 hover:text-red-400" />
                  ) : (
                    <FaHeart className="text-red-400 hover:text-red-300" />
                  )}
                </button>
                {home !== "false" && (
                  <button
                    className="transition-transform transform hover:scale-105"
                    onClick={() =>
                      handleUpdate(items._id, items.title, items.desc)
                    }
                  >
                    <FaEdit className="text-yellow-400 hover:text-yellow-300" />
                  </button>
                )}
                <button
                  className="transition-transform transform hover:scale-105"
                  onClick={() => deleteTask(items._id)}
                >
                  <MdDelete className="text-red-400 hover:text-red-300" />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          className="flex flex-col justify-center items-center bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-lg p-4 text-gray-800 hover:scale-105 hover:cursor-pointer transition-all duration-300"
          onClick={() => setInputDiv("fixed")}
        >
          <IoAddCircleSharp className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
