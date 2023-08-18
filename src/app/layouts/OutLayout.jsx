import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AuthFooter from "../components/Footers/AuthFooter";
import OutNavbar from "../components/Navbars/OutNavbar";
import routes from "../routes/routesOut";

const OutLayout = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/out") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <OutNavbar />
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/out/index" replace />} />
        </Routes>
      </div>
      <AuthFooter />
    </>
  );
};

export default OutLayout;
