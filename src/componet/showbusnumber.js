import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Showbusnumber({ showQuestion,popbox }) {
 
    const inputs = useSelector((state) => state.inputs);
  return (
    <div>
      {popbox&&(
            <div
            
              className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-100"
            >
              <div className="bg-white w-3/4 md:w-1/2 xl:w-1/3 p-6 rounded-lg shadow-lg">
                <div className="flex justify-between">
                  <div className="font-bold text-xl">
                 
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={ showQuestion}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      height="35px"
                      width="35px"
                    >
                      <path
                        fill="#64748B"
                        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
                      />
                    </svg>
                  </div>
                </div>
                <form >
          <label
            htmlFor="name"
            className="text-left text-gray-700 font-bold block"
          >
            BusNumber:
          </label>
          <input
            type="text"
            id="Busnumber"
            name="Busnumber"
            // onChange={handleChange}
            // value={data.name}
            placeholder="Enter your Busnumber"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />

          <label
            htmlFor="vilage"
            className="text-left text-gray-700 font-bold block mt-4"
          >
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            // onChange={handleChange}
            // value={data.vilage}
            placeholder="Enter your Location Link"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />


          
         

    

          <div className="flex space-x-2 mt-3">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"
            >
              {/* {itemToEdit ? "Update" : "Submit"} */}submit
            </button>
         
          </div>
        </form>
              </div>
            </div>
      )}
    </div>
  );
}

export default Showbusnumber;
