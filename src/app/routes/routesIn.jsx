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
    sidebar: true,
    postion: 1,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02",
    component: <Profile />,
    layout: "/in",
    sidebar: false,
  },
  {
    path: "/user-client",
    name: "Client",
    icon: "ni ni-single-02",
    component: <Profile />,
    layout: "/in",
    sidebar: true,
    postion: 2,
  },
  {
    path: "/user-intern",
    name: "Back office",
    icon: "ni ni-single-02",
    component: <Profile />,
    layout: "/in",
    sidebar: true,
    postion: 2,
  },
  {
    path: "/abonnement-service",
    name: "Service Abonnement",
    icon: "ni ni-single-02",
    component: <Profile />,
    layout: "/in",
    sidebar: true,
    postion: 3,
  },
  {
    path: "/abonnement-option",
    name: "Option Abonnement",
    icon: "ni ni-single-02",
    component: <Profile />,
    layout: "/in",
    sidebar: true,
    postion: 3,
  },
  {
    path: "/cour",
    name: "Cour",
    icon: "ni ni-single-02",
    component: <Profile />,
    layout: "/in",
    sidebar: true,
    postion: 4,
  },
  {
    path: "/categorie",
    name: "Categorie Materiel",
    icon: "ni ni-single-02",
    component: <Profile />,
    layout: "/in",
    sidebar: true,
    postion: 5,
  },
  {
    path: "/materiel",
    name: "Materiel",
    icon: "ni ni-single-02",
    component: <Profile />,
    layout: "/in",
    sidebar: true,
    postion: 5,
  },
  {
    path: "/salle",
    name: "Salle",
    icon: "ni ni-single-02",
    component: <Profile />,
    layout: "/in",
    sidebar: true,
    postion: 5,
  },
  {
    path: "/repas",
    name: "Repas",
    icon: "ni ni-single-02",
    component: <Profile />,
    layout: "/in",
    sidebar: true,
    postion: 6,
  },   
];
export default routes;
