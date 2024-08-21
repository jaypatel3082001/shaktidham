import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../cssfile/Admin.css";
import Bus from "./../img/image 4.png";
import { ReactComponent as Vector } from "../svg/Vector.svg";

const Adminlogin = () => {
  const initialdata = {
    email: "",
    password: "",
  };
  const [inputlogindata, setInputlogindata] = useState(initialdata);
  const [showerror, setShowerror] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputlogindata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://busbackend.vercel.app/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputlogindata),
      });
      console.log("saa", response);
      if (response.status === 200) {
        const result = await response.json();

        localStorage.setItem("authToken", result.data);

        setInputlogindata("");

        navigate("/home");
      } else {
        setShowerror(true);
        console.log("else");
      }
    } catch (error) {
      setShowerror(true);
      console.log("catch");
    }
  };

  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
    //   <div className="main bg-white rounded-lg shadow-md p-10 w-96">
    //     {showerror && (
    //       <div className="text-red-500 font-bold text-center mb-3">
    //         Invalid email or password
    //       </div>
    //     )}
    //     <h1 className="text-green-500 text-3xl mb-6">Admin Login</h1>

    //     <form onSubmit={handleSubmit}>
    //       <label
    //         htmlFor="first"
    //         className="text-left text-gray-700 font-bold block mb-2"
    //       >
    //         Email
    //       </label>
    //       <input
    //         type="text"
    //         name="email"
    //         onChange={handleChange}
    //         value={inputlogindata.email}
    //         id="email"
    //         placeholder="Enter your Email"
    //         className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
    //         required
    //       />

    //       <label
    //         htmlFor="password"
    //         className="text-left text-gray-700 font-bold block mt-4 mb-2"
    //       >
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         name="password"
    //         id="password"
    //         onChange={handleChange}
    //         value={inputlogindata.password}
    //         placeholder="Enter your Password"
    //         className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 mt-1"
    //         required
    //       />

    //       <div className="flex justify-center w-100 mt-6">
    //         <button
    //           type="submit"
    //           className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition w-100 duration-300"
    //         >
    //           Submit
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    // <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
    //   <div
    //     className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
    //     style={{
    //       backgroundImage: `url(${require("./../img/bus.jpg")})`,
    //     }}
    //   ></div>
    //   <div className="relative main bg-gray-300 rounded-lg shadow-md p-10 w-96 z-10 mt-32">
    //     {showerror && (
    //       <div className="text-red-500 font-bold text-center mb-3">
    //         Invalid email or password
    //       </div>
    //     )}
    //     <h1 className="text-green-500 text-3xl mb-6">Admin Login</h1>

    //     <form onSubmit={handleSubmit}>
    //       <label
    //         htmlFor="email"
    //         className="text-left text-gray-700 font-bold block mb-2"
    //       >
    //         UserName
    //       </label>
    //       <input
    //         type="text"
    //         name="email"
    //         onChange={handleChange}
    //         value={inputlogindata.email}
    //         id="email"
    //         placeholder="Enter your Email"
    //         className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
    //         required
    //       />

    //       <label
    //         htmlFor="password"
    //         className="text-left text-gray-700 font-bold block mt-4 mb-2"
    //       >
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         name="password"
    //         id="password"
    //         onChange={handleChange}
    //         value={inputlogindata.password}
    //         placeholder="Enter your Password"
    //         className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 mt-1"
    //         required
    //       />

    //       <div className="flex justify-center w-100 mt-6">
    //         <button
    //           type="submit"
    //           className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition w-100 duration-300"
    //         >
    //           Submit
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div className="flex flex-col lg:flex-row items-center justify-between ">
      <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
        <img src={Bus} alt="" className="w-full h-auto" />
      </div>

      <div className="flex items-center justify-center w-full lg:w-1/3">
        <div className="main rounded-lg p-6 sm:p-8 md:p-10 w-full sm:w-80 md:w-96">
          {showerror && (
            <div className="text-red-500 font-bold text-center mb-3">
              Invalid UserName or password
            </div>
          )}
          <h1 className="text-black text-2xl sm:text-3xl mb-4 sm:mb-6">
            Login Details
          </h1>

          <form onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="text-left text-gray-700 font-bold block"
            >
              Username
            </label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={inputlogindata.email}
              id="email"
              placeholder="Enter your Username"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              required
            />

            <label
              htmlFor="password"
              className="text-left text-gray-700 font-bold block mt-4 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={inputlogindata.password}
              placeholder="Enter your Password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 mt-1"
              required
            />

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition duration-300 w-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full lg:w-1/3  lg:mt-0">
        <Vector />
      </div>
    </div>
  );
};

export default Adminlogin;
