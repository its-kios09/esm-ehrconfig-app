import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Ehrconfig from "./ehrconfig.component";

const Root: React.FC = () => {
  const baseName = window.getOpenmrsSpaBase() + "home/ehrconfigs";

  return (
    <BrowserRouter basename={baseName}>
      <Routes>
        <Route path="/" element={<Ehrconfig />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
