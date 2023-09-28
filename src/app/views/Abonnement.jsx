import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row, Button, Modal } from "reactstrap";
import {
  getFile,
  getListOptionAbonnementActif,
  getListServiceAbonnementActif,
  saveSubscription,
  getAuthUser,
} from "../service/frontendService";

import Swal from "sweetalert2";

function Abonnement() {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    getList();
    getListService();
  }, []);
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

  const handleSubscrib = (idService) => {
    Swal.fire({
      icon: "warning",
      title: "Confiramtion",
      input: "select",
      inputOptions: {
        MOIS: "Mensuelle",
        AN: "Annuelle",
      },
      text: "Voulez-vous souscrire mensuelle ou notre offre annuelle ?",
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
        let data = {
          amount: 9.99,
          service: idService,
          typeAbonnement: selected,
        };
        console.log(data);
        const res = await saveSubscription(getAuthUser().id, data);
        console.log("datadddddd",res);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Votre abonnement a bien été enregistré.",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "bg-success",
          },
        });
      }
    });
  };

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col md={12}></Col>
              <Col
                md={12}
                className="d-flex justify-content-between mt-5"
              ></Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container className="mt--8 pb-5 position-relative">
        <Row className="justify-content-center bg-white p-4">
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
                  {row.isDefault ? (
                    ""
                  ) : (
                    <Button
                      color="primary"
                      onClick={() => handleSubscrib(row.id)}
                    >
                      S'abonner
                    </Button>
                  )}
                </Col>
              ))
            : ""}
        </Row>
      </Container>
    </>
  );
}

export default Abonnement;
