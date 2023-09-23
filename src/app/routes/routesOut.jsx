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
import Commande from "../views/vitrine/Commande";
import Reservation from "../views/vitrine/Reservation";
import Dashboard from "../views/Dashboard";

var routesOut = [
  {
    path: "/index",
    name: "Menu.home",
    component: <Home />,
    class: "nav-link-icon ",
    layout: "/out",
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/market",
    name: "Menu.market",
    class: "nav-link-icon text-xs-default",
    component: <Boutique />,
    layout: "/out",
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },

  {
    path: "/group-lessons",
    name: "Menu.groupLessons",
    class: "nav-link-icon",
    component: <CourCollectif />,
    layout: "/out",
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/evenement",
    name: "Menu.calender",
    class: "nav-link-icon",
    component: <Evenement />,
    layout: "/out",
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/price",
    name: "Menu.prices",
    class: "nav-link-icon",
    component: <Prix />,
    layout: "/out",
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/reservation",
    name: "Menu.prices",
    class: "nav-link-icon",
    component: <Reservation />,
    layout: "/out",
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/login",
    name: "Menu.login",
    class: "nav-link-icon",
    component: <Login />,
    layout: "/out",
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },

  {
    path: "/location",
    name: "Menu.location",
    component: <Location />,
    class: "btn btn-warning rounded-pill mt-2 p-2",
    layout: "/out",
    role: [ "Gestionnaire", "Formateur", "Chefs"],
  },
  {
    path: "/register",
    name: "Menu.register",
    class: "nav-link-icon",
    component: <Register />,
    layout: "/out",
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/index",
    name: "Menu.dashboard",
    class: "btn btn-danger rounded-pill mt-2 p-2",
    component: <Dashboard />,
    layout: "/in",
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/cart",
    component: <Panier />,
    class: "nav-link-icon",
    icon: "fa fa-shopping-cart text-warning",
    layout: "/out",
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/order",
    component: <Commande />,
    class: "nav-link-icon",
    icon: "fa fa-shopping-cart text-warning",
    layout: "/out",
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/avis/:id",
    name: "Menu.register",
    class: "nav-link-icon",
    component: <Register />,
    layout: "/out",
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
];
export default routesOut;
