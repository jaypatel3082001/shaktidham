import React, { useCallback, useEffect, useRef, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { TextField, InputAdornment } from "@mui/material";
import { ReactComponent as Action } from "../svg/action.svg";
import { ReactComponent as Celender } from "../svg/celender.svg";
import { ReactComponent as Upboxuparrow } from "../svg/uparrow.svg";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { useDispatch, useSelector } from "react-redux";
import { setDate, setSeatNumber } from "../Slice/redux";

const Homepage = () => {
  const [display, setDisplay] = useState(false);
  const [tooltipId, setTooltipId] = useState(null);
  const [sortdata, setSortdata] = useState([]);
  const tooltipRef = useRef(null);
  const [isloading, setIsloading] = useState(false); // Updated default state
  const [isDateSelected, setIsDateSelected] = useState(false); // New state for date selection
  const buttonRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputs = useSelector((state) => state.inputs);
  const deleteapi = "https://busbackend.vercel.app/seats/delete/";
  const searchapi = "https://busbackend.vercel.app/seats/search";

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
    if (inputs.Tablemanuplation.date) {
      handleDateChange(inputs.Tablemanuplation.date);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside, inputs.Tablemanuplation.date]);

  const handleClicktd = useCallback(
    (id) => {
      setDisplay(!display);
      setTooltipId(id);
      dispatch(setSeatNumber(id));
    },
    [display, dispatch]
  );

  const getLabel = (index) => {
    const alphabet = "ABCDEFGHIJKL";
    if (index < 12) {
      return alphabet[index];
    } else {
      const pairIndex = index - 12;
      const firstNumber = pairIndex * 2 + 1;
      const secondNumber = firstNumber + 1;
      return `${firstNumber},${secondNumber}`;
    }
  };

  const handleEditClick = useCallback(
    (id) => {
      const itemToEdit = sortdata?.data?.find((item) => item._id === id);
      navigate("/form", {
        state: { itemToEdit },
      });
    },
    [navigate, sortdata]
  );

  const formatDateForDisplay = (date) => {
    return date ? date.toFormat("dd/MM/yyyy") : "";
  };

  const formatDateForAPI = (date) => {
    return date ? date.toISODate() : "";
  };

  const handleDateChange = useCallback(
    async (date) => {
      if (!date) {
        setIsDateSelected(false);
        return;
      }
      setIsDateSelected(true);
      setIsloading(true);
      dispatch(setDate(date));
      const formattedDate = formatDateForAPI(date);
      try {
        const response = await fetch(`${searchapi}?Date=${formattedDate}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setSortdata(result);
      } catch (error) {
        console.error("Fetch operation error:", error);
      } finally {
        setIsloading(false);
      }
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await fetch(`${deleteapi}${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        await response.json();
        handleDateChange(inputs.Tablemanuplation.date);
        setDisplay(false); // Explicitly set display to false to hide the tooltip
      } catch (error) {
        console.error("Fetch operation error:", error);
      }
    },
    [handleDateChange, inputs.Tablemanuplation.date, deleteapi]
  );

  return (
    <div className="App p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-4">
      <div className="flex justify-between">
        <div>
          <LocalizationProvider
            dateAdapter={AdapterLuxon}
            adapterLocale="en-gb"
          >
            <DatePicker
              value={inputs.Tablemanuplation.date}
              onChange={(date) => handleDateChange(date)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="w-full"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Celender className="w-6 h-6 text-red-500" />
                      </InputAdornment>
                    ),
                  }}
                  helperText={null}
                  value={formatDateForDisplay(inputs.Tablemanuplation.date)}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div>
          <button
            className="bg-[#8A6FDF] text-white px-4 py-2 rounded hover:bg-[#7451f2] mt-2"
            // onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto" id="table-container">
        {!isDateSelected && !isloading ? (
          <div className="text-center py-4">Select Date</div>
        ) : isloading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border-b">Number</th>
                <th className="p-2 border-b">Village</th>
                <th className="p-2 border-b">Name</th>
                <th className="p-2 border-b">Phone No.</th>
                <th className="p-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(24).keys()].map((i) => {
                const currentLabel = getLabel(i).toString();
                const item = sortdata.data?.find(
                  (item) => item.seatNumber === currentLabel
                );
                return (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="text-center py-5 border">{currentLabel}</td>
                    <td className="p-2 border">{item ? item.vilage : ""}</td>
                    <td className="p-2 border">{item ? item.name : ""}</td>
                    <td className="p-2 border">{item ? item.mobile : ""}</td>
                    <td className="relative border">
                      <>
                        <button
                          className="ml-4 hover:text-blue-900"
                          onClick={() => handleClicktd(currentLabel)}
                          ref={(el) => (buttonRefs.current[i] = el)}
                        >
                          <div className="flex justify-center">
                            <Action className="w-6 h-6 text-blue-500" />
                          </div>
                        </button>
                        {display && tooltipId === currentLabel && (
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
                                  onClick={() => handleEditClick(item?._id)}
                                >
                                  {item?.vilage ? "Edit" : "Add"}
                                </li>
                                <li
                                  className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold"
                                  onClick={() => handleDelete(item?._id)}
                                >
                                  Delete
                                </li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Homepage;
