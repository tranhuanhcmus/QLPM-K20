import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Measure from "../pages/Measure/Measure";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/measure" element={<Measure />} />
    </Routes>
  );
};

export default MainRoute;
