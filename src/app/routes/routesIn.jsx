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
import EspaceCour from "../views/EspaceCour";
import MessageCour from "../views/MessageCour";
import Abonnement from "../views/Abonnement";

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
    path: "/lesson",
    name: "Espace cours",
    icon: "fa fa-book",
    component: <EspaceCour />,
    layout: "/in",
    sidebar: false,
    role: ["Admin", "Gestionnaire", "Client", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/message-cour",
    name: "Notifications",
    icon: "fa fa-message",
    component: <MessageCour />,
    layout: "/in",
    sidebar: false,
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/index",
    name: "Publication",
    icon: "ni ni-tv-2",
    component: <Dashboard />,
    layout: "/in",
    sidebar: true,
    postion: 1,
    role: ["Admin", "Gestionnaire", "Client", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/user-client",
    name: "Client",
    icon: "ni ni-single-02",
    component: <Client />,
    layout: "/in",
    sidebar: true,
    postion: 2,
    role: ["Admin", "Gestionnaire"],
  },
  {
    path: "/user-intern",
    name: "Back office",
    icon: "fa fa-users",
    component: <Intern />,
    layout: "/in",
    sidebar: true,
    postion: 2,
    role: ["Admin", "Gestionnaire"],
  },
  {
    path: "/abonnement-service",
    name: "Service Abonnement",
    icon: "fa fa-compress",
    component: <ServiceAbonnement />,
    layout: "/in",
    sidebar: true,
    postion: 3,
    role: ["Admin", "Gestionnaire"],
  },
  {
    path: "/abonnement-option",
    name: "Option Abonnement",
    icon: "fa fa-expand",
    component: <OptionAbonnement />,
    layout: "/in",
    sidebar: true,
    postion: 3,
    role: ["Admin", "Gestionnaire"],
  },
  {
    path: "/cour",
    name: "Cour",
    icon: "fa fa-book",
    component: <Cour />,
    layout: "/in",
    sidebar: true,
    postion: 4,
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Client", "Chefs"],
  },
  {
    path: "/categorie",
    name: "Categorie Materiel",
    icon: "ni ni-box-2",
    component: <CategorieMateriel />,
    layout: "/in",
    sidebar: true,
    postion: 5,
    role: ["Admin", "Gestionnaire"],
  },
  {
    path: "/materiel",
    name: "Materiel",
    icon: "fa fa-cube",
    component: <Materiel />,
    layout: "/in",
    sidebar: true,
    postion: 5,
    role: ["Admin", "Gestionnaire"],
  },
  {
    path: "/salle",
    name: "Salle",
    icon: "fa fa-shopping-bag",
    component: <Salle />,
    layout: "/in",
    sidebar: true,
    postion: 5,
    role: ["Admin", "Gestionnaire", "Formateur", "Chefs"],
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
    role: ["Admin", "Gestionnaire", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/order",
    name: "Commande",
    icon: "fa fa-shopping-cart",
    component: <Paiement />,
    layout: "/in",
    sidebar: true,
    postion: 7,
    role: ["Admin", "Gestionnaire", "Client", "Livreur", "Formateur", "Chefs"],
  },
  {
    path: "/abonnement",
    name: "Mes abonnements",
    icon: "ni ni-tv-2",
    component: <Abonnement />,
    layout: "/in",
    sidebar: true,
    postion: 1,
    role: ["Client"],
  },
];
export default routes;
