import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Row,
  UncontrolledCollapse,
  UncontrolledDropdown,
} from "reactstrap";
import routesOut from "../../routes/routesOut";

const OutNavbar = () => {
  const { t } = useTranslation();

  function handleClick(lang) {
    i18next.changeLanguage(lang);
  }

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img
              alt="..."
              src={require("../../../assets/img/brand/argon-react-white.png")}
            />
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={require("../../../assets/img/brand/argon-react.png")}
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              {routesOut.map(
                (el, index) =>
                  el.path != "/register" && (
                    <NavItem key={index}>
                      <NavLink
                        className="nav-link-icon"
                        to={el.layout + el.path}
                        tag={Link}
                      >
                        <i className={el.icon} />
                        <span className="nav-link-inner--text">
                          {t(el.name)}
                        </span>
                      </NavLink>
                    </NavItem>
                  )
              )}
            </Nav>
          </UncontrolledCollapse>

          <UncontrolledDropdown nav>
            <DropdownToggle className="pr-0" nav>
              <Media className="align-items-center">
                <Media className="ml-2 text-white d-flex justify-content-between">
                  <span>
                    <i className="fa fa-language mr-2" aria-hidden="true"></i>
                  </span>
                  {t("Langue.name")}
                </Media>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem onClick={() => handleClick("en")}>
                <i className="ni ni-single-02" />
                <span> {t("Langue.en")}</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => handleClick("fr")}>
                <i className="ni ni-user-run" />
                <span> {t("Langue.fr")}</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Container>
      </Navbar>
    </>
  );
};

export default OutNavbar;
