import {
  FormGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { Button, Col, Container, Form, Input, Row } from "reactstrap";
const Commande = () => {
  const { t } = useTranslation();
  const {
    isEmpty,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
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
            <h1>{t("Location.commande")}</h1>
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
                      <FormGroup>
                        <p className="mb-0">Nom complet*</p>
                        <Input type="text" />
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
                        <p className="mb-0">Numéro et nom de rue *</p>
                        <Input
                          type="text"
                          placeholder="Numéro de voie et nom de la rue"
                        />
                        <Input
                          type="text"
                          className="mt-1"
                          placeholder="Batiment, appartement, lot, etc. (facultatif)"
                        />
                        {errors.numero && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.numero}
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup className="mt-2">
                        <p className="mb-0">Ville*</p>
                        <Input type="text" />
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
                        <Input type="number" />
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
                        <Input type="number" />
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
                        <Input type="email" />
                        {errors.email && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.email}
                          </span>
                        )}
                      </FormGroup>
                      <FormGroup className="mt-2">
                        <p className="mb-0">Ville*</p>
                        <Input type="text" />
                        {errors.ville && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.ville}
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
                  </Col>
                  <Col md={12}>
                    <TableContainer>
                      <Table>
                        <TableHead className="bg-white">
                          <TableRow>
                            <TableCell>
                              <h3>Produit</h3>
                            </TableCell>
                            <TableCell style={{textAlign:'end'}}>
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
                                <TableCell style={{textAlign:'end'}}>{"€" + item.itemTotal}</TableCell>
                              </TableRow>
                            );
                          })}
                          <TableRow>
                            <TableCell colSpan={2} className="my-3">
                              Carte de paiement (Stripe)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={2}>
                              <p>
                                Payez avec votre carte bancaire avec Stripe.
                                MODE TEST ACTIVÉ. En mode TEST, vous pouvez
                                utiliser le numéro de carte 4242424242424242
                                avec n’importe quel cryptogramme visuel et une
                                date d’expiration valide ou consulter la
                                documentation Test Stripe pour obtenir plus de
                                numéros de carte.
                              </p>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={2}>
                              <Form role="form">
                                <FormGroup>
                                  <p className="mb-0">Nom complet*</p>
                                  <Input type="text" />
                                  {errors.name && (
                                    <span
                                      className="text-danger"
                                      style={{ fontSize: "13px" }}
                                    >
                                      {errors.name}
                                    </span>
                                  )}
                                </FormGroup>
                              </Form>
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
