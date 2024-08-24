import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Home/Loader";

const Signup = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }
  const [Data, setData] = useState({ username: "", email: "", password: "" });
  const [Message, setMessage] = useState("");
  const [Loading, setLoading] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        setLoading(true);
        const response = await axios.post(
          "https://taskmanagement-jio0.onrender.com/api/v1/sign-in",
          Data
        );
        setData({ username: "", email: "", password: "" });
        setLoading(false);
        setMessage(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      {Loading && (
        <div className="flex h-[100%] items-center justify-center">
          <Loader />
        </div>
      )}
      {Message && Message.length > 0 && Loading === false && (
        <div className="h-[98vh] flex items-center justify-center">
          <div className="text-yellow-500 text-xl bg-zinc-800 border border-yellow-500 font-semibold rounded px-4 py-3">
            {Message}
          </div>
        </div>
      )}
      {Message.length === 0 && Loading === false && (
        <div className="h-[98vh] flex items-center justify-center">
          <div className="p-6 w-5/6 md:w-4/6 lg:w-2/6 rounded bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-lg">
            <div className="text-3xl font-semibold text-gray-800 mb-4">Signup</div>
            <input
              type="username"
              placeholder="Username"
              className="bg-pink-100 px-3 py-2 my-3 w-full rounded border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              name="username"
              value={Data.username}
              onChange={change}
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-blue-100 px-3 py-2 my-3 w-full rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              name="email"
              value={Data.email}
              required
              onChange={change}
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-green-100 px-3 py-2 my-3 w-full rounded border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-300"
              name="password"
              value={Data.password}
              onChange={change}
            />
            <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <button
                className="bg-purple-400 text-white font-semibold px-4 py-2 rounded hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                onClick={submit}
              >
                Sign Up
              </button>
              <Link
                to="/login"
                className="text-gray-500 hover:text-gray-700 mt-2 lg:mt-0"
              >
                Already have an account? Login here
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
