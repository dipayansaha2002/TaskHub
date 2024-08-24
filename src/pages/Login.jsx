import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "https://taskmanagement-jio0.onrender.com/api/v1/log-in",
          Data
        );
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        history("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-6 w-5/6 md:w-4/6 lg:w-2/6 rounded bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-lg">
        <div className="text-3xl font-semibold text-gray-800 mb-4">LOG IN</div>
        <input
          type="username"
          placeholder="Username"
          className="bg-pink-100 px-3 py-2 my-3 w-full rounded border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
          name="username"
          value={Data.username}
          onChange={change}
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-blue-100 px-3 py-2 my-3 w-full rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          name="password"
          value={Data.password}
          onChange={change}
        />
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <button
            className="bg-purple-400 text-white font-semibold px-4 py-2 rounded hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
            onClick={submit}
          >
            Login
          </button>
          <Link to="/signup" className="text-gray-500 hover:text-gray-700 mt-2 lg:mt-0">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
