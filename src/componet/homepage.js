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
  const buttonRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputs = useSelector((state) => state.inputs);
  const deleteapi = "http://localhost:3001/seats/delete/";
  const searchapi = "http://localhost:3001/seats/search";

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
    handleDateChange(inputs.Tablemanuplation.date);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

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
      dispatch(setDate(date));
      if (date) {
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
        }
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

  ////
  // const handleDownload = () => {
  //   // Create a new div element
  //   const element = document.createElement("div");

  //   const labels = [
  //     ["A", "B"],
  //     ["C", "D"],
  //     ["E", "F"],
  //     ["G", "H"],
  //     ["I", "J"],
  //     ["K", "L"],
  //   ];
  //   const number = [
  //     "1.2",
  //     "3.4",
  //     "5.6",
  //     "7.8",
  //     "9.10",
  //     "11.12",
  //     "13.14",
  //     "15.16",
  //     "17.18",
  //     "19.20",
  //     "21.22",
  //     "23.24",
  //   ];

  //   // Function to generate table rows
  //   const generateTableRows = (labelList) => {
  //     return labelList
  //       .map((label) => {
  //         const item = sortdata.data?.find((item) => item.seatNumber === label);

  //         return `
  //       <tr>
  //         <td class="border border-black p-2 text-center">
  //           <div class="font-extrabold text-xl">${label[0]}</div>
  //           <div>${item ? item.name : ""}</div>
  //           <div>${item ? item.vilage : ""}</div>
  //           <div>${item ? item.mobile : ""}</div>
  //         </td>
  //         <td class="border border-black p-2 text-center">
  //           <div class="font-extrabold text-xl">${label[1]}</div>
  //           <div>${item ? item.name : ""}</div>
  //           <div>${item ? item.vilage : ""}</div>
  //           <div>${item ? item.mobile : ""}</div>
  //         </td>
  //       </tr>
  //     `;
  //       })
  //       .join("");
  //   };

  //   // Generate rows for two tables
  //   const firstTableRows = generateTableRows(labels.slice(0, 12));
  //   const secondTableRows = generateTableRows(number.slice(0, 12));

  //   // Set the HTML content
  //   element.innerHTML = `
  //     <html lang="en">
  //     <head>
  //       <meta charset="UTF-8">
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //       <title>Bus Seating Plan</title>
  //       <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  //       <style>
  //         @page {
  //           size: A4;
  //           margin: 0;
  //         }
  //         body {
  //           margin: 0;
  //           padding: 0;
  //         }
  //         .container {
  //           width: 100%;
  //           height: 100%;
  //         }
  //         table {
  //           width: 100%;
  //           border-collapse: collapse;
  //         }
  //         td {
  //           width: 25%;
  //           height: 100px; /* Adjust height as needed */
  //           vertical-align: top;
  //         }
  //         th, td {
  //           border: 1px solid black;
  //         }
  //       </style>
  //     </head>
  //     <body class="font-sans">
  //       <div class="container mx-auto max-w-4xl p-4">
  //         <div class="flex justify-between">
  //           <div class="w-1/2 pr-2">
  //             <table class="min-w-full mb-4">
  //               <thead>
  //                 <tr>
  //                   <th class="bg-red-500 text-white p-2">નીચે</th>
  //                   <th class="bg-red-500 text-white p-2">ઉપર</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 ${firstTableRows}
  //               </tbody>
  //             </table>
  //           </div>
  //           <div class="w-1/2 pl-2">
  //             <table class="min-w-full mb-4">
  //               <thead>
  //                 <tr>
  //                   <th class="bg-red-500 text-white p-2">નીચે</th>
  //                   <th class="bg-red-500 text-white p-2">ઉપર</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 ${secondTableRows}
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>
  //         <table>
  //           <tbody>
  //             <tr><td class="border border-black p-2 text-center w-1/6">1</td><td class="border border-black p-2 text-center"></td></tr>
  //             <tr><td class="border border-black p-2 text-center">2</td><td class="border border-black p-2 text-center"></td></tr>
  //             <tr><td class="border border-black p-2 text-center">3</td><td class="border border-black p-2 text-center"></td></tr>
  //             <tr><td class="border border-black p-2 text-center">4</td><td class="border border-black p-2 text-center"></td></tr>
  //             <tr><td class="border border-black p-2 text-center">5</td><td class="border border-black p-2 text-center"></td></tr>
  //             <tr><td class="border border-black p-2 text-center">6</td><td class="border border-black p-2 text-center"></td></tr>
  //           </tbody>
  //         </table>
  //       </div>
  //     </body>
  //     </html>
  //   `;

  //   // Convert the HTML content to PDF
  //   html2pdf()
  //     .from(element)
  //     .toPdf()
  //     .get("pdf")
  //     .then(function (pdf) {
  //       // Adjust the PDF settings to fit content on one page
  //       pdf.autoPrint();
  //       pdf.save("shaktidham.pdf");
  //     });
  // };
  // const handleDownload = () => {
  //   // Create a new div element
  //   const element = document.createElement("div");

  //   const labels = [
  //     ["A", "B"],
  //     ["C", "D"],
  //     ["E", "F"],
  //     ["G", "H"],
  //     ["I", "J"],
  //     ["K", "L"],
  //   ];

  //   const number = [
  //     ["1.2", "3.4"],
  //     ["5.6", "7.8"],
  //     ["9.10", "11.12"],
  //     ["13.14", "15.16"],
  //     ["17.18", "19.20"],
  //     ["21.22", "23.24"],
  //   ];

  //   // Function to generate table rows
  //   const generateTableRows = (labelList, isNumber) => {
  //     return labelList
  //       .map((label) => {
  //         const item = sortdata.data?.find(
  //           (item) => item.seatNumber === (isNumber ? label : label.join(""))
  //         );

  //         console.log(`Searching for seat number: ${label}`);
  //         console.log(`Found item:`, item);

  //         return `
  //         <tr>
  //           <td class="border border-black p-2 text-center">
  //             <div class="font-extrabold text-xl">${label[0] || label}</div>
  //             <div>${item ? item.name : ""}</div>
  //             <div>${item ? item.vilage : ""}</div>
  //             <div>${item ? item.mobile : ""}</div>
  //           </td>
  //           <td class="border border-black p-2 text-center">
  //             <div class="font-extrabold text-xl">${label[1] || ""}</div>
  //             <div>${item ? item.name : ""}</div>
  //             <div>${item ? item.vilage : ""}</div>
  //             <div>${item ? item.mobile : ""}</div>
  //           </td>
  //         </tr>
  //       `;
  //       })
  //       .join("");
  //   };

  //   // Generate rows for two tables
  //   const firstTableRows = generateTableRows(labels, false);
  //   const secondTableRows = generateTableRows(number, true);

  //   // Set the HTML content
  //   element.innerHTML = `
  //     <html lang="en">
  //     <head>
  //       <meta charset="UTF-8">
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //       <title>Bus Seating Plan</title>
  //       <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  //       <style>
  //         @page {
  //           size: A4;
  //           margin: 0;
  //         }
  //         body {
  //           margin: 0;
  //           padding: 0;
  //         }
  //         .container {
  //           width: 100%;
  //           height: 100%;
  //         }
  //         table {
  //           width: 100%;
  //           border-collapse: collapse;
  //         }
  //         td {
  //           width: 25%;
  //           height: 100px; /* Adjust height as needed */
  //           vertical-align: top;
  //         }
  //         th, td {
  //           border: 1px solid black;
  //         }
  //       </style>
  //     </head>
  //     <body class="font-sans">
  //       <div class="container mx-auto max-w-4xl p-4">
  //         <div class="flex justify-between">
  //           <div class="w-1/2 pr-2">
  //             <table class="min-w-full mb-4">
  //               <thead>
  //                 <tr>
  //                   <th class="bg-red-500 text-white p-2">ને નીચે</th>
  //                   <th class="bg-red-500 text-white p-2">ઉપર</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 ${firstTableRows}
  //               </tbody>
  //             </table>
  //           </div>
  //           <div class="w-1/2 pl-2">
  //             <table class="min-w-full mb-4">
  //               <thead>
  //                 <tr>
  //                   <th class="bg-red-500 text-white p-2">ને નીચે</th>
  //                   <th class="bg-red-500 text-white p-2">ઉપર</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 ${secondTableRows}
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>
  //         <table>
  //           <tbody>
  //             <tr><td class="border border-black p-2 text-center w-1/6">1</td><td class="border border-black p-2 text-center"></td></tr>
  //             <tr><td class="border border-black p-2 text-center">2</td><td class="border border-black p-2 text-center"></td></tr>
  //             <tr><td class="border border-black p-2 text-center">3</td><td class="border border-black p-2 text-center"></td></tr>
  //             <tr><td class="border border-black p-2 text-center">4</td><td class="border border-black p-2 text-center"></td></tr>
  //             <tr><td class="border border-black p-2 text-center">5</td><td class="border border-black p-2 text-center"></td></tr>
  //             <tr><td class="border border-black p-2 text-center">6</td><td class="border border-black p-2 text-center"></td></tr>
  //           </tbody>
  //         </table>
  //       </div>
  //     </body>
  //     </html>
  //   `;

  //   // Convert the HTML content to PDF
  //   html2pdf()
  //     .from(element)
  //     .toPdf()
  //     .get("pdf")
  //     .then(function (pdf) {
  //       // Adjust the PDF settings to fit content on one page
  //       pdf.autoPrint();
  //       pdf.save("shaktidham.pdf");
  //     });
  // };

  ///

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
              onChange={handleDateChange}
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
      </div>
    </div>
  );
};

export default Homepage;
