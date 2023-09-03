import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { Button, Col, Container, Row } from "reactstrap";
const Panier = () => {
  const { t } = useTranslation();
  const { isEmpty, items, cartTotal, updateItemQuantity, removeItem } =
    useCart();
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
            <h1>{t("Location.cart")}</h1>
          </Col>
          {isEmpty ? (
            <h1 className="text-center">Cart is Empty</h1>
          ) : (
            <>
              <Col md={12} className="mt-5 border">
                <TableContainer>
                  <Table>
                    <TableHead className="bg-white">
                      <TableRow>
                        <TableCell colSpan={3} className="bold">
                          Produit
                        </TableCell>
                        <TableCell className="text-bold">Prix</TableCell>
                        <TableCell className="text-bold">Quantité</TableCell>
                        <TableCell className="text-bold">Sous-total</TableCell>
                        <TableCell className="text-bold">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              <span
                                className="rounded-circle text-muted ml-2"
                                style={{
                                  border: "1px solid #8898aa",
                                  cursor: "pointer",
                                  padding: "2px",
                                }}
                                onClick={() => removeItem(item.id)}
                              >
                                <span aria-hidden={true}>×</span>
                              </span>
                            </TableCell>
                            <TableCell>
                              {" "}
                              <img
                                alt="..."
                                width={70}
                                height={70}
                                src={item.imgUrl}
                              />
                            </TableCell>{" "}
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{"€" + item.price}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{"€" +item.itemTotal}</TableCell>
                            <TableCell>
                              {" "}
                              <Button
                                className="btn btn-outline-danger"
                                onClick={() =>
                                  updateItemQuantity(item.id, item.quantity - 1)
                                }
                              >
                                –
                              </Button>
                              <Button
                                className="btn btn-outline-warning"
                                onClick={() =>
                                  updateItemQuantity(item.id, item.quantity + 1)
                                }
                              >
                                +
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Col>
              <Col md={6}></Col>
              <Col md={6} className="mt-5 border">
                <TableContainer>
                  <Table>
                    <TableHead className="bg-white">
                      <TableRow>
                        <TableCell colSpan={2}>
                          <h1>Total panier</h1>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Sous-total</TableCell>
                        <TableCell>{"€" + cartTotal}</TableCell>
                      </TableRow>{" "}
                      <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell>{"€" + cartTotal}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <Button
                            color="warning"
                            className="rounded-pill btn-block"
                            onClick={() => navigate("/out/order")}
                          >
                            Valider la commande
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Panier;
