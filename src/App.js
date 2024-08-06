import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Homepage from "./componet/homepage";
import BookinForm from "./componet/form";
import store from "./store";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
        <Routes>
          <Route path="/form" element={<BookinForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
