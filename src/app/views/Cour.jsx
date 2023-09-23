import React from "react";
import CourClient from "../components/Cour/CourClient";
import CourInter from "../components/Cour/CourInter";

const Cour = () => {
  return (
    <>
      {JSON.parse(localStorage.getItem("auth"))?.token.role == "Client" ? (
        <CourClient />
      ) : (
        <CourInter />
      )}
    </>
  );
};
export default Cour;
