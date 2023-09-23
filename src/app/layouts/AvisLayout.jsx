import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import AuthFooter from "../components/Footers/AuthFooter";
import OutNavbar from "../components/Navbars/OutNavbar";
import routes from "../routes/routesAvis";

const AvisLayout = (props) => {
  const mainContent = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      return (
        <Route path={prop.path} element={prop.component} key={key} exact />
      );
    });
  };

  return (
    <CartProvider>
      <div className="" ref={mainContent}>
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/avis" replace />} />
        </Routes>
      </div>
      <AuthFooter />
    </CartProvider>
  );
};

export default AvisLayout;
