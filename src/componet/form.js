import React from "react";

function form() {
  return (
    <div className={`flex items-center justify-center min-h-screen `}>
      <div className={`main bg-gray-100 rounded-lg shadow-md p-10 w-96`}>
        <div>
          {/* {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>ffff
          )} */}
          <h1 className="text-green-500 text-3xl mb-6">Booking</h1>

          <form>
            <label
              htmlFor="first"
              className="text-left text-gray-700 font-bold block "
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              //   onChange={handleChange}
              //   value={inputlogindata.firstname}
              placeholder="Enter your Name"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              required
            />
            <label
              htmlFor="last"
              className="text-left text-gray-700 font-bold block "
            >
              Village:
            </label>
            <input
              type="text"
              id="Village"
              name="Village"
              //   onChange={handleChange}
              //   value={inputlogindata.lastname}
              placeholder="Enter your Village"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              required
            />
            <label
              htmlFor="first"
              className="text-left text-gray-700 font-bold block mt-4"
            >
              Mobail No:
            </label>
            <input
              type="number"
              id="number"
              name="number"
              //   onChange={handleChange}
              //   value={inputlogindata.userEmail}
              placeholder="Enter your Mobail Number"
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
              //   onChange={handleChange}
              //   value={inputlogindata.userkey}
              placeholder="Enter your key"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 mt-1"
              required
            />

            <label
              htmlFor="userkey"
              className="text-left text-gray-700 font-bold block mt-4"
            >
              Date
            </label>
            <input
              type="text"
              id="Date"
              name="Date"
              //   onChange={handleChange}
              //   value={inputlogindata.userkey}aa
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
              <button
                type="button"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default form;
