import React from "react";
import CategorieMateriel from "../views/CategorieMateriel";
import Client from "../views/Client";
import Cour from "../views/Cour";
import Dashboard from "../views/Dashboard";
import Intern from "../views/Intern";
import Materiel from "../views/Materiel";
import OptionAbonnement from "../views/OptionAbonnement";
import Profile from "../views/Profile";
import Repas from "../views/Repas";
import Salle from "../views/Salle";
import ServiceAbonnement from "../views/ServiceAbonnement";
import Paiement from "../views/Paiement";
import Event from "../views/Event";

var routes = [
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02",
    component: <Profile />,
    layout: "/in",
    sidebar: false,
    role: ["Admin", "Gestionnaire", "Client", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2",
    component: <Dashboard />,
    layout: "/in",
    sidebar: true,
    postion: 1,
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/user-client",
    name: "Client",
    icon: "ni ni-single-02",
    component: <Client />,
    layout: "/in",
    sidebar: true,
    postion: 2,
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/user-intern",
    name: "Back office",
    icon: "fa fa-users",
    component: <Intern />,
    layout: "/in",
    sidebar: true,
    postion: 2,
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/abonnement-service",
    name: "Service Abonnement",
    icon: "fa fa-compress",
    component: <ServiceAbonnement />,
    layout: "/in",
    sidebar: true,
    postion: 3,
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/abonnement-option",
    name: "Option Abonnement",
    icon: "fa fa-expand",
    component: <OptionAbonnement />,
    layout: "/in",
    sidebar: true,
    postion: 3,
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/cour",
    name: "Cour",
    icon: "fa fa-book",
    component: <Cour />,
    layout: "/in",
    sidebar: true,
    postion: 4,
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/categorie",
    name: "Categorie Materiel",
    icon: "ni ni-box-2",
    component: <CategorieMateriel />,
    layout: "/in",
    sidebar: true,
    postion: 5,
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/materiel",
    name: "Materiel",
    icon: "fa fa-cube",
    component: <Materiel />,
    layout: "/in",
    sidebar: true,
    postion: 5,
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/salle",
    name: "Salle",
    icon: "ni ni-single-02",
    component: <Salle />,
    layout: "/in",
    sidebar: true,
    postion: 5,
    role: ["Admin", "Gestionnaire", "Client", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/reservation",
    name: "Evenement",
    icon: "fa fa-calendar",
    component: <Event />,
    layout: "/in",
    sidebar: true,
    postion: 5,
    role: ["Admin", "Gestionnaire", "Client", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/repas",
    name: "Repas",
    icon: "fa fa-cutlery",
    component: <Repas />,
    layout: "/in",
    sidebar: true,
    postion: 6,
    role: ["Admin", "Gestionnaire", "Client", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/order",
    name: "Commande",
    icon: "fa fa-shopping-cart",
    component: <Paiement />,
    layout: "/in",
    sidebar: true,
    postion: 7,
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
];
export default routes;
