import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddSystemPage from "./pages/AddSystemPage";


function App() {
  return (
    <div className="font-montserrat">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addsystem" element={<AddSystemPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
