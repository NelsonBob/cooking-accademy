import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/plugins/nucleo/css/nucleo.css";
import "./assets/scss/argon-dashboard-react.scss";
import "./assets/scss/custom.css";

import InLayout from "./app/layouts/InLayout";
import OutLayout from "./app/layouts/OutLayout";
import './i18n';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/in/*" element={<InLayout />} />
      <Route path="/out/*" element={<OutLayout />} />
      <Route path="*" element={<Navigate to="/out/index" replace />} />
    </Routes>
  </BrowserRouter>
);
