import React, { useCallback, useEffect, useRef, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, InputAdornment } from "@mui/material";
import { ReactComponent as Action } from "../svg/action.svg";
import { ReactComponent as Celender } from "../svg/celender.svg";
import { ReactComponent as Upboxuparrow } from "../svg/uparrow.svg";
import { Link } from "react-router-dom";

function Homepage() {
  const [display, setDisplay] = useState(false);
  const [tooltipId, setTooltipId] = useState(null);
  const tooltipRef = useRef(null);
  const buttonRefs = useRef([]);

  const handleClickOutside = useCallback((event) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target) &&
      buttonRefs.current.every((ref) => ref && !ref.contains(event.target))
    ) {
      setDisplay(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleClicktd = useCallback(
    (id) => {
      setDisplay((prev) => (prev && tooltipId === id ? false : true));
      setTooltipId(id);
    },
    [tooltipId]
  );

  return (
    <div className="App p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-4">
      <div className="flex justify-between">
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="w-full"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Celender className="w-6 h-6 text-gray-500" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div>
          <Link to="/form">
            <button
              className="bg-[#8A6FDF] text-white px-4 py-2 rounded hover:bg-[#7451f2] mt-2 "
              // onClick={exportToExcel}
            >
              Download
            </button>
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border-b">Number</th>
              <th className="p-2 border-b">Village</th>
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(30).keys()].map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 py-5 border-b">Item {index + 1}</td>
                <td className="p-2 border-b">jasdan</td>
                <td className="p-2 border-b">xyzbhai</td>
                <td className="relative border">
                  <button
                    className="ml-4 hover:text-blue-900"
                    onClick={() => handleClicktd(index)}
                    ref={(el) => (buttonRefs.current[index] = el)}
                  >
                    <div className="flex justify-center">
                      <Action className="w-6 h-6 text-blue-500" />
                    </div>
                  </button>
                  {display && tooltipId === index && (
                    <div
                      role="tooltip"
                      className="absolute shadow-lg bg-blue-400 z-10 border rounded p-2"
                      style={{
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                      ref={tooltipRef}
                    >
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Upboxuparrow className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="flex flex-col">
                        <ul className="space-y-2">
                          <li
                            className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold"
                            // onClick={() => handleEditClick(row._id)}
                          >
                            Edit
                          </li>
                          <li
                            className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold"
                            // onClick={() => handleDelete(row._id)}
                          >
                            Delete
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Homepage;
