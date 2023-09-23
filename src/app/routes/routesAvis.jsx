import React from "react";
import Avis from "../views/vitrine/Avis";

var routesAvis = [
  {
    path: "/",
    name: "Menu.register",
    class: "d-none",
    component: <Avis />,
    layout: "/avis",
  },
];
export default routesAvis;
