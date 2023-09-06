import {
  FormGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { Col, Container, Form, Input, Row } from "reactstrap";
import { checkpaiementStripe } from "../../service/frontendService";
import CheckoutForm from "../CheckoutForm";

const Commande = () => {
  const { t } = useTranslation();
  const { isEmpty, cartTotal, items, emptyCart } = useCart();
  const [name, setName] = useState("");
  const [numero, setNumero] = useState("");
  const [numero1, setNumero1] = useState("");
  const [ville, setVille] = useState("");
  const [email, setEmail] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [telephone, setTelephone] = useState("");
  const [note, setNote] = useState("");
  const [numeroCode, setNumeroCode] = useState("");
  const [dateExp, setDateExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");

  const stripePromise = loadStripe(
    "pk_test_51NnKDQGdfs9w59yh0SXgMNpJHgtzNmzUVqcYDob1bkx0IZh7h5xVEcYedRIHsRaVzjyRDcn93kbjvMBzXxTrL4t500UIKjkZA0"
  );
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};
    if (!email) {
      formIsValid = false;
      newErrors.email = "Email is required";
    }
    if (!cvc) {
      formIsValid = false;
      newErrors.cvc = "CVC is required";
    }
    if (!name) {
      formIsValid = false;
      newErrors.name = "Name is required";
    }
    if (!numero) {
      formIsValid = false;
      newErrors.numero = "Numero is required";
    }
    if (!ville) {
      formIsValid = false;
      newErrors.ville = "Ville is required";
    }
    if (!codePostal) {
      formIsValid = false;
      newErrors.codePostal = "Code postal is required";
    }
    if (!telephone) {
      formIsValid = false;
      newErrors.telephone = "Telephone is required";
    }
    if (!numeroCode) {
      formIsValid = false;
      newErrors.numeroCode = "Numero code is required";
    }
    if (!dateExp) {
      formIsValid = false;
      newErrors.dateExp = "Date Expiration is required";
    }
    setErrors(newErrors);
    return formIsValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
    }
  };

  const clearCartclick = () => {
    emptyCart();
  };
  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#fb6340",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };
  useEffect(() => {
    handleValidateOder();
  }, []);
  const handleValidateOder = async () => {
    try {
      const data = { items, amount: cartTotal, token: "eee" };
      const response = await checkpaiementStripe(
        JSON.parse(localStorage.getItem("auth")).userid,
        data
      );
      if (response) {
        setClientSecret(response.clientSecret);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="header bg-primary py-7 py-lg-8">
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
      <Container className="mt--8 pb-5 position-relative">
        <Row className="justify-content-center">
          <Col md={12} className="my-4">
            <h1 className="text-white">{t("Location.commande")}</h1>
          </Col>
          {isEmpty ? (
            <h1 className="text-center">Cart is Empty</h1>
          ) : (
            <>
              <Col md={7} className="mt-4">
                <Row>
                  <Col md={12}>
                    <Form role="form">
                      <h2 className="mb-0 mt-3">Détails de facturation</h2>
                      <hr className="my-2" />
                      <FormGroup className="mt-4">
                        <p className="mb-0">Nom complet*</p>
                        <Input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
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
                      <FormGroup className="mt-2">
                        <p className="mb-0">Numéro et nom de rue*</p>
                        <Input
                          type="text"
                          value={numero}
                          onChange={(e) => setNumero(e.target.value)}
                          placeholder="Numéro de voie et nom de la rue"
                        />
                        {errors.numero && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.numero}
                          </span>
                        )}
                        <Input
                          type="text"
                          className="mt-1"
                          onChange={(e) => setNumero1(e.target.value)}
                          value={numero1}
                          placeholder="Batiment, appartement, lot, etc. (facultatif)"
                        />
                      </FormGroup>
                      <FormGroup className="mt-2">
                        <p className="mb-0">Ville*</p>
                        <Input
                          type="text"
                          value={ville}
                          onChange={(e) => setVille(e.target.value)}
                        />
                        {errors.ville && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.ville}
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup className="mt-2">
                        <p className="mb-0">Code postal*</p>
                        <Input
                          type="number"
                          value={codePostal}
                          onChange={(e) => setCodePostal(e.target.value)}
                        />
                        {errors.codePostal && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.codePostal}
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup className="mt-2">
                        <p className="mb-0">Téléphone*</p>
                        <Input
                          type="number"
                          value={telephone}
                          onChange={(e) => setTelephone(e.target.value)}
                        />
                        {errors.telephone && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.telephone}
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup className="mt-2">
                        <p className="mb-0">E-mail*</p>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                      <h2 className="mb-0 mt-3">
                        Informations complémentaires
                      </h2>
                      <hr className="my-2" />
                      <FormGroup>
                        <p className="mb-0">Notes de commande (facultatif)</p>
                        <Input
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          type="textarea"
                          placeholder="Commentaires concernant votre commande, ex. : consignes de livraison."
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </Col>
              <Col md={5} className="mt-4 border">
                <Row>
                  <Col md={12}>
                    <h2 className="mb-0 mt-3">Votre commande</h2>
                    <hr className="my-2" />
                    <TableContainer className="mt-4">
                      <Table>
                        <TableHead className="bg-white">
                          <TableRow>
                            <TableCell>
                              <h3>Produit</h3>
                            </TableCell>
                            <TableCell style={{ textAlign: "end" }}>
                              <h3>Sous-total</h3>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {items.map((item, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell>
                                  {item.name + " x " + item.quantity}
                                </TableCell>
                                <TableCell style={{ textAlign: "end" }}>
                                  {"€" + item.itemTotal}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                          <TableRow>
                            <TableCell colSpan={2} className="my-3">
                              {clientSecret ? (
                                <Elements
                                  options={options}
                                  stripe={stripePromise}
                                >
                                  <CheckoutForm
                                    clearCartclick={() => clearCartclick()}
                                  />
                                </Elements>
                              ) : (
                                <div
                                  className="spinner-grow text-warning"
                                  role="status"
                                >
                                  <span className="sr-only">Loading...</span>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Col>
                </Row>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Commande;
