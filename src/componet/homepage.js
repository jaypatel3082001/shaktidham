import React, { useCallback, useEffect, useRef, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { TextField, InputAdornment } from "@mui/material";
import { ReactComponent as Action } from "../svg/action.svg";
import { ReactComponent as Celender } from "../svg/celender.svg";
import { ReactComponent as Upboxuparrow } from "../svg/uparrow.svg";
import { Link, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { useDispatch, useSelector } from "react-redux";
import { setDate, setSortdata } from "../Slice/redux";
import "dayjs/locale/de";

const Homepage = () => {
  const [display, setDisplay] = useState(false);
  const [tooltipId, setTooltipId] = useState(null);
  const [data, setData] = useState([]);
  const [sortdata, setSortdata] = useState([]); // State to store fetched data
  const tooltipRef = useRef(null);
  const buttonRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editapi = "https://busbackend.vercel.app/seats/update/";
  const deleteapi = "http://localhost:3001/seats/delete/";
  const addapi = "http://localhost:3001/seats/create";
  const searchapi = "http://localhost:3001/seats/search";
  const readapi = "http://localhost:3001/seats/read";
  console.log(data);
  console.log(sortdata);
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
      const itemToEdit = data.find((item) => item._id === id);
      navigate("/form", {
        state: { itemToEdit },
      });
    },
    [navigate, data]
  );

  const handleDateChange = useCallback(
    async (date) => {
      dispatch(setDate(date));

      if (date) {
        const formattedDate = date.toISODate();
        console.log(formattedDate); // Format the date to yyyy-mm-dd
        try {
          const response = await fetch(`${searchapi}?Date=${formattedDate}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          console.log(result, "result");
          setSortdata(result);
        } catch (error) {
          console.error("Fetch operation error:", error);
        }
      }
    },
    [dispatch]
  );

  const handleDelete = useCallback(async (id) => {
    try {
      const response = await fetch(`${deleteapi}${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      await response.json();
    } catch (error) {
      console.error("Fetch operation error:", error);
    }
  }, []);

  // const fetchData = useCallback(async () => {
  //   try {
  //     const response = await fetch(readapi);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const result = await response.json();
  //     setData(result);
  //   } catch (error) {
  //     console.error("Fetch operation error:", error);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchData(); // Fetch data when component mounts
  // }, [fetchData]);
  console.log(getLabel(0));
  const handleDownload = () => {
    const element = document.getElementById("table-container");
    const opt = {
      margin: 1,
      filename: "table.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="App p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-4">
      <div className="flex justify-between">
        <div>
          <LocalizationProvider
            dateAdapter={AdapterLuxon}
            adapterLocale="en-gb"
          >
            <DatePicker
              onChange={handleDateChange} // Handle date change
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
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div>
          <button
            className="bg-[#8A6FDF] text-white px-4 py-2 rounded hover:bg-[#7451f2] mt-2"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto" id="table-container">
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
              console.log(item, "item");
              return (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="text-center py-5 border">{currentLabel}</td>

                  <td className="p-2 border">{item ? item.vilage : ""}</td>

                  <td className="p-2 border">{item ? item.name : ""}</td>
                  <td className="p-2 border">{item ? item.name : ""}</td>
                  <td className="relative border">
                    <>
                      <button
                        className="ml-4 hover:text-blue-900"
                        onClick={() => handleClicktd(item._id)}
                        ref={(el) => (buttonRefs.current[i] = el)}
                      >
                        <div className="flex justify-center">
                          <Action className="w-6 h-6 text-blue-500" />
                        </div>
                      </button>
                      {display && tooltipId === item._id && (
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
                                onClick={() => handleEditClick(item._id)}
                              >
                                {item.vilage ? "Edit" : "Add"}
                              </li>
                              <li
                                className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold"
                                onClick={() => handleDelete(item._id)}
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
      </div>
    </div>
  );
};

export default Homepage;
