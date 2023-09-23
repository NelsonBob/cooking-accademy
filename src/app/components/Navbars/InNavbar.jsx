import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Nav,
  Navbar,
  UncontrolledDropdown,
} from "reactstrap";
import { readFile } from "../../service/frontendService";
const InNavbar = (props) => {
  const navigate = useNavigate();
  const [imgContent, setImgContent] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("auth") === null) return navigate("/out/index");
    getPicture();
  }, []);
  const getPicture = async () => {
    if (JSON.parse(localStorage.getItem("auth"))?.token.picture) {
      let imgUrl = await getFile(
        JSON.parse(localStorage.getItem("auth"))?.token.picture
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
    localStorage.clear();
    return navigate("/out/index");
  };
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <h2 className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
            {props.brandText}
          </h2>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
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
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {JSON.parse(localStorage.getItem("auth"))?.userName}
                    </span>
                  </Media>
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
        </Container>
      </Navbar>
    </>
  );
};

export default InNavbar;
