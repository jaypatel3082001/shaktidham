import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Form() {
  const inputs = useSelector((state) => state.inputs);

  // Function to format the date
  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="main bg-gray-100 rounded-lg shadow-md p-10 w-96">
        <h1 className="text-green-500 text-3xl mb-6">Booking</h1>

        <form>
          <label
            htmlFor="name"
            className="text-left text-gray-700 font-bold block"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            // Uncomment and define handleChange function
            // onChange={handleChange}
            // value={inputlogindata.firstname}
            placeholder="Enter your Name"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />

          <label
            htmlFor="Village"
            className="text-left text-gray-700 font-bold block mt-4"
          >
            Village:
          </label>
          <input
            type="text"
            id="Village"
            name="Village"
            // Uncomment and define handleChange function
            // onChange={handleChange}
            // value={inputlogindata.lastname}
            placeholder="Enter your Village"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />

          <label
            htmlFor="number"
            className="text-left text-gray-700 font-bold block mt-4"
          >
            Mobile No:
          </label>
          <input
            type="number"
            id="number"
            name="number"
            // Uncomment and define handleChange function
            // onChange={handleChange}
            // value={inputlogindata.userEmail}
            placeholder="Enter your Mobile Number"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />

          <label
            htmlFor="userkey"
            className="text-left text-gray-700 font-bold block mt-4"
          >
            Set Number
          </label>
          <input
            type="text"
            id="userkey"
            name="userkey"
            // Uncomment and define handleChange function
            value={inputs.Tablemanuplation.data}
            placeholder="Enter your key"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 mt-1"
            required
          />

          <label
            htmlFor="Date"
            className="text-left text-gray-700 font-bold block mt-4"
          >
            Date
          </label>
          <input
            type="text"
            id="Date"
            name="Date"
            // Uncomment and define handleChange function
            // onChange={handleChange}
            value={formatDate(inputs.Tablemanuplation.date)}
            placeholder="Enter your Date"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 mt-1"
            required
          />

          <div className="flex space-x-2 mt-3">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"
            >
              Submit
            </button>
            <Link to={"/"}>
              <button
                type="button"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"
              >
                Back
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
