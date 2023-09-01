import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import {
  Button,
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
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  function handleClick(lang) {
    i18next.changeLanguage(lang);
  }
  const navigate = useNavigate();

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container>
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
                  el.path != "/register" &&
                  el.path != "/cart" && (
                    <NavItem key={index}>
                      <NavLink
                        className={el.class}
                        to={el.layout + el.path}
                        tag={Link}
                      >
                        {el.icon && <i className={el.icon} />}
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
                  {!isEmpty ? (
                    <p className="position-relative">
                      <i
                        className="fa fa-shopping-cart text-warning mt-2"
                        style={{ fontSize: "1.3em" }}
                      />{" "}
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {totalItems}
                      </span>
                    </p>
                  ) : (
                    <i
                      className="fa fa-shopping-cart text-warning "
                      style={{ fontSize: "1.3em" }}
                    />
                  )}
                </Media>
              </Media>
            </DropdownToggle>
            <DropdownMenu
              className="dropdown-menu-arrow"
              right
              style={{ width: "max-content" }}
            >
              {isEmpty ? (
                <div className="p-3">
                  <p> Aucun article dans le panier. </p>
                  <Button
                    type="button"
                    className="btn-outline-warning rounded-pill"
                    onClick={() => navigate("/out/index")}
                  >
                    Continuer les achats
                  </Button>
                </div>
              ) : (
                <>
                  {items.map((item, index) => {
                    return (
                      <div key={index}>
                        <div
                          className="d-flex p-2"
                          style={{ justifyContent: "space-between" }}
                        >
                          <img
                            alt="..."
                            width={70}
                            height={70}
                            src={item.imgUrl}
                          />
                          <div>
                            <p className="text-mutted bold">{item.name}</p>
                            <span className="text-mutted bold">
                              {item.quantity + " x €" + item.price}
                            </span>
                          </div>
                          <div>
                            <span
                              className="rounded-circle text-muted ml-2"
                              style={{
                                border: "1px solid #8898aa",
                                cursor:"pointer",
                                padding: "2px",
                              }}
                              onClick={() => removeItem(item.id)}
                            >
                              <span aria-hidden={true}>×</span>
                            </span>
                          </div>
                        </div>
                        <DropdownItem divider />
                      </div>
                    );
                  })}
                  <DropdownItem divider />
                  <div
                    className="d-flex m-3"
                    style={{ justifyContent: "space-between" }}
                  >
                    <span>Sous-total :</span>
                    <span>{"€" + cartTotal}</span>
                  </div>
                  <DropdownItem divider />
                  <div
                    className="d-flex m-3"
                    style={{ justifyContent: "space-between" }}
                  >
                    <spaqn>Total (tous frais compris) </spaqn>
                    <span className="bold ml-4">{"€" + cartTotal}</span>
                  </div>
                  <div className="m-3">
                    <Button
                      type="button"
                      className="btn-outline-warning rounded-pill btn-block"
                      onClick={() => navigate("/out/cart")}
                    >
                      Voir le panier
                    </Button>
                    <Button
                      type="button"
                      color="warning"
                      className="rounded-pill btn-block ml-0"
                      onClick={() => navigate("/out/commander")}
                    >
                      Commander
                    </Button>
                  </div>
                </>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
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
