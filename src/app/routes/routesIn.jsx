import React from "react";
import Dashboard from "../views/Dashboard";
import Profile from "../views/Profile";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2",
    component: <Dashboard />,
    layout: "/in",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02",
    component: <Profile />,
    layout: "/in",
  },
];
export default routes;
