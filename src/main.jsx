import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Addflx from "./Components/Addflx.jsx";
import View from "./Components/View.jsx";
import Editflx from "./Components/Editflx.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/additm" element={<Addflx />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/edit/:id" element={<Editflx />} />
      </Routes>
    </BrowserRouter>
  </>
);
