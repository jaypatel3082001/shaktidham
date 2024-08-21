import { configureStore } from "@reduxjs/toolkit";
// import inputReducer from './slice'; // Adjust path if necessary
import inputReducer from "./Slice/redux";

const store = configureStore({
  reducer: {
    inputs: inputReducer,
  },
});

export default store;
// <div className="App p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-4">
//   {/* <div className="flex justify-center">
//     <div>
//       <LocalizationProvider
//         dateAdapter={AdapterLuxon}
//         adapterLocale="en-gb"
//       >
//         <DatePicker
//           value={inputs.Tablemanuplation.date}
//           onChange={(date) => handleDateChange(date)}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               className="w-full"
//               variant="outlined"
//               size="small"
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <Celender className="w-6 h-6 text-red-500" />
//                   </InputAdornment>
//                 ),
//               }}
//               helperText={null}
//               value={formatDateForDisplay(inputs.Tablemanuplation.date)}
//             />
//           )}
//         />
//       </LocalizationProvider>
//     </div>{" "}
//   </div> */}
//   <div className="flex flex-col lg:flex-row items-center justify-between ">
//     <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
//       <img src={Bus} alt="" className="w-full h-auto" />
//     </div>

//     <div className="flex justify-center">
//       <div>
//         <LocalizationProvider
//           dateAdapter={AdapterLuxon}
//           adapterLocale="en-gb"
//         >
//           <DatePicker
//             value={inputs.Tablemanuplation.date}
//             onChange={(date) => handleDateChange(date)}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 className="w-full"
//                 variant="outlined"
//                 size="small"
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <Celender className="w-6 h-6 text-red-500" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 helperText={null}
//                 value={formatDateForDisplay(inputs.Tablemanuplation.date)}
//               />
//             )}
//           />
//         </LocalizationProvider>
//       </div>{" "}
//     </div>

//     <div className="w-full lg:w-1/3  lg:mt-0">
//       <Vector />
//     </div>
//   </div>
//   {!isDateSelected && !isloading ? (
//     <div className="text-center "></div>
//   ) : isloading ? (
//     <div className="text-center py-4">Loading...</div>
//   ) : (
//     <div>
//       <div className="flex justify-between mb-3">
//         <button
//           className="bg-[#8A6FDF] text-white px-4 py-2 rounded hover:bg-[#7451f2] mt-2"
//           onClick={handleDownload}
//         >
//           Download
//         </button>
//         <button
//           className="bg-[#8A6FDF] text-white px-4 py-2 rounded hover:bg-[#7451f2] mt-2"
//           onClick={showQuestion}
//         >
//           Add
//         </button>
//       </div>

//       <div className="flex-1 overflow-x-auto" id="table-container">
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 border-b">Number</th>
//               <th className="p-2 border-b">Village</th>
//               <th className="p-2 border-b">Name</th>
//               <th className="p-2 border-b">Phone No.</th>
//               <th className="p-2 border-b">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {[...Array(30).keys()].map((i) => {
//               const currentLabel = getLabel(i).toString();
//               const item = sortdata.data?.find(
//                 (item) => item.seatNumber === currentLabel
//               );
//               return (
//                 <tr key={i} className="hover:bg-gray-50">
//                   <td className="text-center py-5 border">
//                     {currentLabel}
//                   </td>
//                   <td className="p-2 border">{item ? item.vilage : ""}</td>
//                   <td className="p-2 border">{item ? item.name : ""}</td>
//                   <td className="p-2 border">{item ? item.mobile : ""}</td>
//                   <td className="relative border">
//                     <>
//                       <button
//                         className="ml-4 hover:text-blue-900"
//                         onClick={() => handleClicktd(currentLabel)}
//                         ref={(el) => (buttonRefs.current[i] = el)}
//                       >
//                         <div className="flex justify-center">
//                           <Action className="w-6 h-6 text-blue-500" />
//                         </div>
//                       </button>
//                       {display && tooltipId === currentLabel && (
//                         <div
//                           role="tooltip"
//                           className="absolute shadow-lg bg-blue-400 z-10 border rounded p-2"
//                           style={{
//                             top: "100%",
//                             left: "50%",
//                             transform: "translateX(-50%)",
//                           }}
//                           ref={tooltipRef}
//                         >
//                           <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//                             <Upboxuparrow className="w-4 h-4 text-blue-400" />
//                           </div>
//                           <div className="flex flex-col">
//                             <ul className="space-y-2">
//                               <li
//                                 className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold"
//                                 onClick={() => handleEditClick(item?._id)}
//                               >
//                                 {item?.vilage ? "Edit" : "Add"}
//                               </li>
//                               <li
//                                 className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold"
//                                 onClick={() => handleDelete(item?._id)}
//                               >
//                                 Delete
//                               </li>
//                               <li
//                                 className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold"
//                                 onClick={() =>
//                                   showQuestionsss(
//                                     item?.mobile,
//                                     item?.vilage
//                                   )
//                                 }
//                               >
//                                 Send
//                               </li>
//                             </ul>
//                           </div>
//                         </div>
//                       )}
//                     </>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )}

//   <Showbusnumber
//     showQuestion={showQuestion}
//     popbox={popbox}
//     busdetails={busdetails}
//     handleDateChange={handleDateChange}
//   />
//   <Msgbox
//     showQuestionsss={showQuestionsss}
//     msgbox={msgbox}
//     handleSendWhatsApp={handleSendWhatsApp}
//     data={data}
//     setData={setData}
//   />
// </div>
