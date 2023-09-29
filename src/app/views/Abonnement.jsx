import {
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
import { Button, Col, Container, Modal, Row } from "reactstrap";
import Swal from "sweetalert2";
import {
  checkpaiementStripe,
  getAuthUser,
  getByIdUser,
  getFile,
  getListOptionAbonnementActif,
  getListServiceAbonnementActif,
  saveSubscription,
} from "../service/frontendService";
import CheckoutForm from "./CheckoutForm";

const Abonnement = () => {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [idservice, setIdservice] = useState("");
  const [nomService, setNomService] = useState("");
  const [montant, setMontant] = useState(0.0);
  const [isOpen, setIsOpen] = useState(false);
  const [offre, setOffre] = useState("");
  const stripePromise = loadStripe(
    "pk_test_51NnKDQGdfs9w59yh0SXgMNpJHgtzNmzUVqcYDob1bkx0IZh7h5xVEcYedRIHsRaVzjyRDcn93kbjvMBzXxTrL4t500UIKjkZA0"
  );
  const [clientSecret, setClientSecret] = useState("");
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
    getList();
    getListService();
  }, []);
  const handleValidateOder = async (total) => {
    try {
      const data = { amount: total };
      const response = await checkpaiementStripe(
        JSON.parse(localStorage.getItem("auth"))?.userid,
        data
      );
      if (response) {
        setClientSecret(response.clientSecret);
      }
    } catch (error) {}
  };

  const getList = async () => {
    setTableData([]);
    try {
      const res = await getListServiceAbonnementActif();
      const urls = {};
      for (const row of res) {
        const imgUrl = await getFile(row.imgPath);
        urls[row.id] = imgUrl;
      }

      setImageUrls(urls);
      setTableData(res);
    } catch (error) {}
  };
  const getListService = async () => {
    setTableData1([]);
    try {
      const res = await getListOptionAbonnementActif();
      res.sort(compareByServiceAbonnementId);
      setTableData1(res);
    } catch (error) {}
  };
  const compareByServiceAbonnementId = (a, b) => {
    const idA = a.optionServiceAbonnement[0]?.serviceAbonnement.id || 0;
    const idB = b.optionServiceAbonnement[0]?.serviceAbonnement.id || 0;

    return idA - idB;
  };
  const handleClose = () => setIsOpen(!isOpen);
  const handleSubscrib = (idService, name) => {
    Swal.fire({
      icon: "warning",
      title: "Confiramtion",
      input: "select",
      inputOptions: {
        MOIS: "Mensuelle ( 9.9€ )",
        AN: "Annuelle ( 19€ )",
      },
      text:
        "Voulez-vous souscrire mensuellement ou annuellement à notre offre " +
        name +
        " ?",
      confirmButtonText: "Oui",
      showCancelButton: true,
      cancelButtonText: "Non",
      cancelButtonColor: "#d33",

      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      showLoaderOnConfirm: true,
      preConfirm: async (selected) => {
        setOffre(selected);
        setIdservice(idService);
        let amount = 0.0;
        if (name.includes("Starter")) {
          if (selected.includes("MOIS")) amount = 9.9;
          else amount = 113;
        } else if (name.includes("Master")) {
          if (selected.includes("MOIS")) amount = 19;
          else amount = 220;
        }
        setMontant(amount);
        setNomService(name);
        const resthan = handleValidateOder(amount);
        if (resthan) setIsOpen(true);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  const clearCartclick = () => {};
  const validateForm = () => {
    return true;
  };
  const handleSubmitPaiment = async () => {
    let data = {
      amount: montant,
      service: idservice,
      typeAbonnement: offre,
    };
    let result = await saveSubscription(getAuthUser().id, data);
    handleClose();
    Swal.fire({
      text: result,
      showConfirmButton: false,
      customClass: {
        popup: "bg-success",
      },
      timer: 2000,
    });
    let u = await getByIdUser(getAuthUser().id);
    let userinfo = JSON.parse(localStorage.getItem("auth"));
    
    localStorage.setItem(
      "auth",
      JSON.stringify({
        status: userinfo.status,
        fonction: userinfo.fonction,
        userName: userinfo.userName,
        userToken: userinfo.userToken,
        userid: userinfo.userid,
        token: {
          adress: userinfo.token.adress,
          exp: userinfo.token.exp,
          iat: userinfo.token.iat,
          id: userinfo.token.id,
          name: userinfo.token.name,
          picture: userinfo.token.picture,
          role: userinfo.token.role,
          sub: userinfo.token.sub,
          subscription: u.serviceAbonnement,
        },
      })
    );
    getList();
    getListService();
  };

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col md={12}>
              <h5 className="text-uppercase text-white mb-0">
                  Liste des offres
                </h5>
              </Col>
             
            </Row>
          </div>
        </Container>
      </div>
      <Container className="mt--7" fluid>
        <Row className="row-grid p-4">
          <Col xs={12}>
            <Row className="justify-content-center bg-white pt-4 align-items-center">
              <Col md={3}>
                <h3 className="bold">{t("Price.row1")}</h3>
                <span className="bold">{t("Price.row2")}</span>
              </Col>
              {tableData && tableData.length > 0 ? (
                tableData.map((row, i) => (
                  <Col md={3} key={i} className="center-grid">
                    <img
                      alt="..."
                      width={80}
                      height={100}
                      src={imageUrls[row.id]}
                    />
                    <h2 className="text-center">{row.name}</h2>
                    <p
                      className="text-center font-italic"
                      style={{ width: "6rem" }}
                    >
                      {row.description}
                    </p>
                  </Col>
                ))
              ) : (
                <Col lg={12}>
                  <h2 className="text-center">Aucune service trouvé</h2>
                </Col>
              )}
            </Row>
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          {tableData1 && tableData1.length > 0 ? (
            tableData1.map((row, i) => (
              <>
                <Col md={3} className="d-flex align-items-center" key={i}>
                  <h3 className="bold">{row.name}</h3>
                </Col>
                {row.optionServiceAbonnement.map((row1, inde) => (
                  <Col md={3} className="center-grid" key={inde}>
                    <div
                      className={
                        row1.icon && row1.description
                          ? "text-center"
                          : "d-flex justify-content-center align-items-center "
                      }
                    >
                      {row1.icon && (
                        <span
                          className={
                            row1.isValueicon
                              ? "badge-circle bg-success text-white"
                              : "badge-circle bg-danger text-white"
                          }
                        >
                          <i
                            className={
                              row1.isValueicon ? "fa fa-check" : "fa fa-times"
                            }
                            aria-hidden="true"
                          ></i>
                        </span>
                      )}
                      {row1.description && (
                        <h3 className="text-center bold">
                          {row1.descriptionvalue}
                        </h3>
                      )}
                    </div>
                  </Col>
                ))}
                <Col xs={12}>
                  <hr />
                </Col>
              </>
            ))
          ) : (
            <Col lg={12}>
              <h2 className="text-center">Aucune option trouvé</h2>
            </Col>
          )}
          <Col md={3}></Col>
          {tableData && tableData.length > 0
            ? tableData.map((row, i) => (
                <Col md={3} key={i} className="center-grid">
                  {row.isDefault ||
                  getAuthUser().subscription.name.includes(row.name) ? (
                    ""
                  ) : (
                    <Button
                      color="primary"
                      onClick={() => handleSubscrib(row.id, row.name)}
                    >
                      S'abonner
                    </Button>
                  )}
                </Col>
              ))
            : ""}
        </Row>
      </Container>

      <Modal
        className="modal-dialog-centered"
        isOpen={isOpen}
        toggle={handleClose}
      >
        <div className="modal-header">
          <h5 className="modal-title">Abonnement</h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={handleClose}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <TableContainer>
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
                <TableRow>
                  <TableCell>Offre {nomService}</TableCell>
                  <TableCell style={{ textAlign: "end" }}>{montant}€</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} className="my-3">
                    {clientSecret ? (
                      <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm
                          clearCartclick={() => clearCartclick()}
                          validateForm={() => validateForm()}
                          handleSubmitPaiment={() => handleSubmitPaiment()}
                        />
                      </Elements>
                    ) : (
                      <div className="spinner-grow text-warning" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}{" "}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Modal>
    </>
  );
};

export default Abonnement;
