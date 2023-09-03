import React from "react";
import Boutique from "../views/vitrine/Boutique";
import CourCollectif from "../views/vitrine/CourCollectif";
import Evenement from "../views/vitrine/Evenement";
import Home from "../views/vitrine/Home";
import Location from "../views/vitrine/Location";
import Login from "../views/vitrine/Login";
import Prix from "../views/vitrine/Prix";
import Register from "../views/vitrine/Register";
import Panier from "../views/vitrine/Panier";

var routesOut = [
  {
    path: "/index",
    name: "Menu.home",
    component: <Home />,
    class:"nav-link-icon",
    layout: "/out",
  },
  {
    path: "/market",
    name: "Menu.market",
    class:"nav-link-icon",
    component: <Boutique />,
    layout: "/out",
  },

  {
    path: "/group-lessons",
    name: "Menu.groupLessons",
    class:"nav-link-icon",
    component: <CourCollectif />,
    layout: "/out",
  },
  {
    path: "/evenement",
    name: "Menu.calender",
    class:"nav-link-icon",
    component: <Evenement />,
    layout: "/out",
  },
  {
    path: "/price",
    name: "Menu.prices",
    class:"nav-link-icon",
    component: <Prix />,
    layout: "/out",
  },
  {
    path: "/login",
    name: "Menu.login",
    class:"nav-link-icon",
    component: <Login />,
    layout: "/out",
  },
  {
    path: "/location",
    name: "Menu.location",
    component: <Location />,
    class: "btn btn-warning rounded-pill mt-2 p-2",
    layout: "/out",
  },
  {
    path: "/register",
    name: "Menu.register",
    class:"nav-link-icon",
    component: <Register />,
    layout: "/out",
  },
  {
    path: "/cart",
    component: <Panier />,
    class: "nav-link-icon",
    icon:"fa fa-shopping-cart text-warning",
    layout: "/out",
  },
];
export default routesOut;
