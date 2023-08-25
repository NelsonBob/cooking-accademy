import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// reactstrap components
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
import { signup } from "../../service/frontendService";
import Swal from "sweetalert2";

const Register = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adress, setAdress] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");
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
    if (!adress) {
      formIsValid = false;
      newErrors.adress = "Adress is required";
    }
    if (!name) {
      formIsValid = false;
      newErrors.name = "Name is required";
    }
    if (password && password !== password_confirm) {
      formIsValid = false;
      newErrors.password = "Password must match with confirm password";
    }

    setErrors(newErrors);
    return formIsValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const user = await signup({
          name,
          email,
          password,
          adress,
        });

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
          return navigate("/out/login");
        }
      } catch (error) {}
    }
  };

  return (
    <>
      <div className="header bg-img-register py-7 py-lg-8">
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
          <Col lg="6" md="8">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <h1 className="bold">{t("Menu.register")}</h1>
                </div>
                <Form role="form">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Name"
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </InputGroup>
                    {errors.name && (
                      <span
                        className="text-danger"
                        style={{ fontSize: "13px" }}
                      >
                        {errors.name}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Adress"
                        type="text"
                        onChange={(e) => setAdress(e.target.value)}
                      />
                    </InputGroup>
                    {errors.adress && (
                      <span
                        className="text-danger"
                        style={{ fontSize: "13px" }}
                      >
                        {errors.adress}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        autoComplete="new-email"
                        name="email"
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
                        style={{ fontSize: "13px" }}
                      >
                        {errors.password}
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
                        placeholder="Confirm Password"
                        type="password"
                        autoComplete="new-password"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button
                      className="mt-4"
                      onClick={handleSubmit}
                      color="primary"
                      type="button"
                    >
                      Create account
                    </Button>
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

export default Register;
