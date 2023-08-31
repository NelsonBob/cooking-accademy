import React from "react";
import Boutique from "../views/vitrine/Boutique";
import CourCollectif from "../views/vitrine/CourCollectif";
import Evenement from "../views/vitrine/Evenement";
import Home from "../views/vitrine/Home";
import Login from "../views/vitrine/Login";
import Prix from "../views/vitrine/Prix";
import Register from "../views/vitrine/Register";
import Location from "../views/vitrine/Location";

var routesOut = [
  {
    path: "/index",
    name: "Menu.home",
    component: <Home />,
    layout: "/out",
  },
  {
    path: "/market",
    name: "Menu.market",
    component: <Boutique />,
    layout: "/out",
  },
  {
    path: "/location",
    name: "Menu.location",
    component: <Location />,
    layout: "/out",
  },
  {
    path: "/group-lessons",
    name: "Menu.groupLessons",
    component: <CourCollectif />,
    layout: "/out",
  },
  {
    path: "/evenement",
    name: "Menu.calender",
    component: <Evenement />,
    layout: "/out",
  },
  {
    path: "/price",
    name: "Menu.prices",
    component: <Prix />,
    layout: "/out",
  },
  {
    path: "/login",
    name: "Menu.login",
    component: <Login />,
    layout: "/out",
  },
  {
    path: "/register",
    name: "Menu.register",
    component: <Register />,
    layout: "/out",
  },
];
export default routesOut;
