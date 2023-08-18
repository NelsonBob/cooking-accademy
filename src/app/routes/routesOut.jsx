import React from "react";
import CourCollectif from "../views/vitrine/CourCollectif";
import Home from "../views/vitrine/Home";
import Login from "../views/vitrine/Login";
import Prix from "../views/vitrine/Prix";
import Register from "../views/vitrine/Register";

var routesOut = [
  {
    path: "/index",
    name: "Home",
    icon: "ni ni-world-2",
    component: <Home />,
    layout: "/out",
  },
  {
    path: "/price",
    name: "Prices",
    icon: "ni ni-diamond",
    component: <Prix />,
    layout: "/out",
  },

  {
    path: "/group-lessons",
    name: "Group Lessons",
    icon: "ni ni-books",
    component: <CourCollectif />,
    layout: "/out",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25",
    component: <Login />,
    layout: "/out",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08",
    component: <Register />,
    layout: "/out",
  },
];
export default routesOut;
