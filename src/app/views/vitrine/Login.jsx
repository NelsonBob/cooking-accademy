import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { login } from "../../service/frontendService";
import Swal from "sweetalert2";
const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};
    if (!email) {
      formIsValid = false;
      newErrors.email = "Email is required";
    }
    if (!password) {
      formIsValid = false;
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (validateForm()) {
    //   try {
    //     const user = await login(email, password);
    //     if (user) {
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: "Connection reussi",
    //         showConfirmButton: false,
    //         timer: 1500,
    //         showClass: {
    //           popup: "animate__animated animate__fadeInDown",
    //         },
    //         hideClass: {
    //           popup: "animate__animated animate__fadeOutUp",
    //         },
    //       });
    //       return navigate("/in/index");
    //     }
    //   } catch (error) {
    //     setErrorMessage(true);
    //   }
    // }
    return navigate("/in/index");
  };
  return (
    <>
      <div className="header bg-img-login py-7 py-lg-8">
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-default" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </div>
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <h1 className="bold">{t("Menu.login")}</h1>
                </div>
                <Form role="form">
                  {errorMessage && (
                    <h3 className="text-danger text-center">
                      <strong>Password or Email incorrect</strong>
                    </h3>
                  )}
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        autoComplete="new-email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                    {errors.email && (
                      <span
                        className="text-danger"
                        style={{ fontSize: "13px" }}
                      >
                        {errors.email}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        autoComplete="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                    {errors.password && (
                      <span
                        className="text-danger"
                        style={{
                          marginBottom: "10px",
                          fontSize: "13px",
                        }}
                      >
                        {errors.password}
                      </span>
                    )}
                  </FormGroup>

                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Sign in
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs="6">
                <a href="/out/forgot-password">
                  <small>Forgot password?</small>
                </a>
              </Col>
              <Col className="text-right" xs="6">
                <a href="/out/register">
                  <small>Create new account</small>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
