import React from "react";
import CourCollectif from "../views/vitrine/CourCollectif";
import Home from "../views/vitrine/Home";
import Login from "../views/vitrine/Login";
import Prix from "../views/vitrine/Prix";
import Register from "../views/vitrine/Register";

var routesOut = [
  {
    path: "/index",
    name: "Menu.home",
    icon: "ni ni-world-2",
    component: <Home />,
    layout: "/out",
  },
  {
    path: "/price",
    name: "Menu.prices",
    icon: "ni ni-diamond",
    component: <Prix />,
    layout: "/out",
  },

  {
    path: "/group-lessons",
    name: "Menu.groupLessons",
    icon: "ni ni-books",
    component: <CourCollectif />,
    layout: "/out",
  },
  {
    path: "/login",
    name: "Menu.login",
    icon: "ni ni-key-25",
    component: <Login />,
    layout: "/out",
  },
  {
    path: "/register",
    name: "Menu.register",
    icon: "ni ni-circle-08",
    component: <Register />,
    layout: "/out",
  },
];
export default routesOut;
