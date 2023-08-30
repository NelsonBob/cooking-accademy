import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import { Link, NavLink as NavLinkRRD, useNavigate } from "react-router-dom";
import {
  Col,
  Collapse,
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
  UncontrolledDropdown,
} from "reactstrap";
import { readFile } from "../../service/frontendService";

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();

  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes, postion = 1) => {
    return routes.map((prop, key) => {
      let autorization = prop.role.includes(
        JSON.parse(localStorage.getItem("auth")).token.role
      );
      if (prop.sidebar && prop.postion == postion && autorization)
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        );
    });
  };

  const { routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }
  const navigate = useNavigate();
  const [imgContent, setImgContent] = useState(null);
  useEffect(() => {
    getPicture();
  }, []);
  const getPicture = async () => {
    if (JSON.parse(localStorage.getItem("auth")).token.picture) {
      let imgUrl = await getFile(
        JSON.parse(localStorage.getItem("auth")).token.picture
      );
      setImgContent(imgUrl);
    }
  };
  const getFile = async (url) => {
    try {
      const response = await readFile(url);
      const imgUrl = URL.createObjectURL(response);
      return imgUrl;
    } catch (error) {
      console.error("Error displaying file:", error);
    }
  };
  const logout = () => {
    return navigate("/out/index");
  };
  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={
                      imgContent
                        ? imgContent
                        : require("../../../assets/img/brand/icon-4399701_1280.webp")
                    }
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/in/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={logout}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>{createLinks(routes, 1)}</Nav>
          <hr className="my-3" />
          <h6 className="navbar-heading text-muted">User</h6>
          <Nav className="mb-md-3" navbar>
            {createLinks(routes, 2)}
          </Nav>
          <h6 className="navbar-heading text-muted">Abonnement</h6>
          <Nav className="mb-md-3" navbar>
            {createLinks(routes, 3)}
          </Nav>
          <h6 className="navbar-heading text-muted">Etude</h6>
          <Nav className="mb-md-3" navbar>
            {createLinks(routes, 4)}
          </Nav>
          <h6 className="navbar-heading text-muted">Boutique</h6>
          <Nav className="mb-md-3" navbar>
            {createLinks(routes, 5)}
          </Nav>
          <h6 className="navbar-heading text-muted">Nutrition</h6>
          <Nav className="mb-md-3" navbar>
            {createLinks(routes, 6)}
          </Nav>
          <h6 className="navbar-heading text-muted">Stock</h6>
          <Nav className="mb-md-3" navbar>
            {createLinks(routes, 7)}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
