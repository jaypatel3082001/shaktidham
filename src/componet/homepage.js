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
import { setDate, setSeatNumber } from "../Slice/redux";
import "dayjs/locale/de";

function Homepage() {
  const [display, setDisplay] = useState(false);
  const [tooltipId, setTooltipId] = useState(null);
  const tooltipRef = useRef(null);
  const buttonRefs = useRef([]);
  const Navigate = useNavigate();
  const inputs = useSelector((state) => state.inputs);
  const dispatch = useDispatch();

  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
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

  const handleDownload = () => {
    // Create a new div element
    const element = document.createElement("div");
    element.innerHTML = `
      <html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bus Seating Plan</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="font-sans">
    <div class="container mx-auto max-w-4xl p-4">
        <div class="flex justify-between">
            <div class="w-1/2 pr-2">
                <table class="min-w-full border-collapse border border-black mb-4">
                    <thead>
                        <tr>
                            <th class="border border-black bg-red-500 text-white p-2">નીચે</th>
                            <th class="border border-black bg-red-500 text-white p-2">ઉપર</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="w-1/2 pl-2">
                <table class="min-w-full border-collapse border border-black mb-4">
                    <thead>
                        <tr>
                            <th class="border border-black bg-red-500 text-white p-2">નીચે</th>
                            <th class="border border-black bg-red-500 text-white p-2">ઉપર</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                            <td class="border border-black p-2 text-center">
                                <div class="font-extrabold text-xl">A</div>
                                <div>jasdan</div>
                                <div>office</div>
                                <div>8141415252</div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
        <table class="w-full">
            <tbody>
                <tr>
                    <td class="border border-black p-2 text-center w-1/6">1</td>
                    <td class="border border-black p-2 text-center"></td>
                </tr>
                <tr>
                    <td class="border border-black p-2 text-center">2</td>
                    <td class="border border-black p-2 text-center"></td>
                <tr>
                    <td class="border border-black p-2 text-center">3</td>
                    <td class="border border-black p-2 text-center"></td>
                </tr>
                <tr>
                    <td class="border border-black p-2 text-center">4</td>
                    <td class="border border-black p-2 text-center"></td>
                </tr>
                <tr>
                    <td class="border border-black p-2 text-center">5</td>
                    <td class="border border-black p-2 text-center"></td>
                </tr>
                <tr>
                    <td class="border border-black p-2 text-center">6</td>
                    <td class="border border-black p-2 text-center"></td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>`;

    // Convert the HTML content to PDF
    html2pdf()
      .from(element)
      .toPdf()
      .get("pdf")
      .then(function (pdf) {
        pdf.save("shaktidham.pdf");
      });
  };
  const getLabel = (index) => {
    const alphabet = "ABCDEFGHIJKL";
    if (index < 12) {
      return alphabet[index];
    } else {
      // Calculate the pair of numbers
      const pairIndex = index - 12;
      const firstNumber = pairIndex * 2 + 1;
      const secondNumber = firstNumber + 1;
      return `${firstNumber},${secondNumber}`;
    }
  };
  const handleEditClick = (seatno) => {
    // localStorage.setItem("seatno", seatno);
    dispatch(setSeatNumber(seatno));
    Navigate("/form");
  };
  const handleDateChange = (date) => {
    dispatch(setDate(date)); // Dispatch the action to set the date
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
              // Bind the selected date to the date picker
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
          {/* <Link to="/form"> */}
          <button
            className="bg-[#8A6FDF] text-white px-4 py-2 rounded hover:bg-[#7451f2] mt-2 "
            on
            onClick={handleDownload}
          >
            Download
          </button>
          {/* </Link> */}
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
            {[...Array(24).keys()].map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="text-center py-5 border">{getLabel(index)}</td>
                <td className="p-2 border">jasdan</td>
                <td className="p-2 border">officesssssssssssss</td>

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
                          {/* <Link to={"/form"}> */}
                          <li
                            className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold"
                            onClick={() => handleEditClick(getLabel(index))}
                          >
                            Edit
                          </li>
                          {/* </Link> */}
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
