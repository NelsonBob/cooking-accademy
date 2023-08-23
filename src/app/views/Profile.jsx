import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import UserHeader from "../components/Headers/UserHeader";
import {
  updateProfilClient,
  updateProfilIntern,
} from "../service/frontendService";

const Profile = () => {
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem("auth")).token.name
  );
  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem("auth")).token.sub
  );
  const [adress, setAdress] = useState(
    JSON.parse(localStorage.getItem("auth")).token.adress
  );
  const [errors, setErrors] = useState({});
  const [password_confirm, setPasswordConfirm] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!adress) {
      formIsValid = false;
      newErrors.adress = "Field is required";
    }
    if (!name) {
      formIsValid = false;
      newErrors.name = "Username is required";
    }

    setErrors(newErrors);
    return formIsValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      let id = JSON.parse(localStorage.getItem("auth")).userid;
      let data = {
        name,
        fontion: adress,
      };
      try {
        let user;
        if (JSON.parse(localStorage.getItem("auth")).token.role == "Client")
          user = await updateProfilClient(id, data);
        if (JSON.parse(localStorage.getItem("auth")).token.role !== "Client")
          user = await updateProfilIntern(id, data);
        if (user) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Compte crée avec succès",
            showConfirmButton: false,
            timer: 1500,
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }
      } catch (error) {}
    }
  };
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/brand/icon-4399701_1280.webp")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>

              <CardBody className="pt-0 pt-md-7">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>{JSON.parse(localStorage.getItem("auth")).userName}</h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {JSON.parse(localStorage.getItem("auth")).fonction}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col>
                    <h3 className="mb-0">My account</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div>
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h6 className="heading-small text-muted mb-4">
                          User information
                        </h6>{" "}
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={handleSubmit}
                          size="sm"
                        >
                          Update profil
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            value={name}
                          />
                          {errors.name && (
                            <span
                              className="text-danger"
                              style={{ fontSize: "13px" }}
                            >
                              {errors.name}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                            value={email}
                            disabled
                          />
                          {errors.email && (
                            <span
                              className="text-danger"
                              style={{ fontSize: "13px" }}
                            >
                              {errors.email}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            {JSON.parse(localStorage.getItem("auth")).token
                              .role == "Client"
                              ? "Adress"
                              : "Fonction"}
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={adress}
                            id="input-first-name"
                            placeholder={
                              JSON.parse(localStorage.getItem("auth")).token
                                .role == "Client"
                                ? "Adress"
                                : "Fonction"
                            }
                            type="text"
                            onChange={(e) => setAdress(e.target.value)}
                          />
                          {errors.adress && (
                            <span
                              className="text-danger"
                              style={{ fontSize: "13px" }}
                            >
                              {errors.adress}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <div>
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h6 className="heading-small text-muted mb-4">
                          Change Password
                        </h6>{" "}
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={handleSubmitPassword}
                          size="sm"
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label className="form-control-label">Password</label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </FormGroup>
                        {errors.password && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.password}
                          </span>
                        )}
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <label className="form-control-label">
                            Confirm Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Confirm Password"
                            type="password"
                            autoComplete="new-password"
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
