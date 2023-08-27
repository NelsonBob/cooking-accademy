import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";

function Prix() {
  const { t } = useTranslation();

  return (
    <>
      <div className="header bg-img-prix py-7 py-lg-8">
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
        <Row className="justify-content-center bg-white p-4">
          <Col xs={12}>
            <Row className="justify-content-center bg-white pt-4">
              <Col md={3}>
                <h1 className="bold">{t("Price.row1")}</h1>
                <span className="bold">{t("Price.row2")}</span>
              </Col>
              <Col md={3} className="center-grid">
                <img
                  alt="..."
                  width={80}
                  height={100}
                  src={require("../../../assets/img/abonnement/free.png")}
                />
                <p
                  className="text-center font-italic mt-2"
                  style={{ width: "6rem" }}
                >
                  {t("Price.free")}
                </p>
              </Col>
              <Col md={3} className="center-grid">
                <img
                  alt="..."
                  width={80}
                  height={100}
                  src={require("../../../assets/img/abonnement/starter.png")}
                />
                <p
                  className="text-center font-italic mt-2"
                  style={{ width: "6rem" }}
                >
                  {t("Price.starter")}
                </p>
              </Col>
              <Col md={3} className="center-grid">
                <img
                  alt="..."
                  width={80}
                  height={100}
                  src={require("../../../assets/img/abonnement/master.png")}
                />
                <p
                  className="text-center font-italic mt-2"
                  style={{ width: "6rem" }}
                >
                  {t("Price.master")}
                </p>
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={12}>
            <Row className="justify-content-center bg-white">
              <Col md={3}>
                <h3 className="bold">{t("Price.row3")}</h3>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-success text-white">
                    <i className="fa fa-check " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-danger text-white">
                    <i className="fa fa-times " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-danger text-white">
                    <i className="fa fa-times " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={12}>
            <Row className="justify-content-center bg-white">
              <Col md={3}>
                <h3 className="bold">{t("Price.row4")}</h3>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-success text-white">
                    <i className="fa fa-check " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-success text-white">
                    <i className="fa fa-check " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-success text-white">
                    <i className="fa fa-check " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={12}>
            <Row className="justify-content-center bg-white">
              <Col md={3}>
                <h3 className="bold">{t("Price.row5")}</h3>
              </Col>
              <Col md={3} className="center-grid">
                <h3 className="text-center bold">{t("Price.row13")}</h3>
              </Col>
              <Col md={3} className="center-grid">
                <h3 className="text-center bold">{t("Price.row14")}</h3>
              </Col>
              <Col md={3} className="center-grid">
                <h3 className="text-center bold">{t("Price.row15")}</h3>
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={12}>
            <Row className="justify-content-center bg-white">
              <Col md={3}>
                <h3 className="bold">{t("Price.row6")}</h3>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-danger text-white">
                    <i className="fa fa-times " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-success text-white">
                    <i className="fa fa-check " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-success text-white">
                    <i className="fa fa-check " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={12}>
            <Row className="justify-content-center bg-white">
              <Col md={3}>
                <h3 className="bold">{t("Price.row7")}</h3>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-danger text-white">
                    <i className="fa fa-times " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-danger text-white">
                    <i className="fa fa-times " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-success text-white">
                    <i className="fa fa-check " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={12}>
            <Row className="justify-content-center bg-white">
              <Col md={3}>
                <h3 className="bold">{t("Price.row8")}</h3>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-danger text-white">
                    <i className="fa fa-times " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-success text-white">
                    <i className="fa fa-check " aria-hidden="true"></i>
                  </span>
                </div>
                <h3 className="text-center bold">{t("Price.row16")}</h3>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-success text-white">
                    <i className="fa fa-check " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={12}>
            <Row className="justify-content-center bg-white">
              <Col md={3}>
                <h3 className="bold">{t("Price.row9")}</h3>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-danger text-white">
                    <i className="fa fa-times " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-danger text-white">
                    <i className="fa fa-times " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-success text-white">
                    <i className="fa fa-check " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={12}>
            <Row className="justify-content-center bg-white">
              <Col md={3}>
                <h3 className="bold">{t("Price.row10")}</h3>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-danger text-white">
                    <i className="fa fa-times " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-success text-white">
                    <i className="fa fa-check " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-success text-white">
                    <i className="fa fa-check " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={12}>
            <Row className="justify-content-center bg-white">
              <Col md={3}>
                <h3 className="bold">{t("Price.row11")}</h3>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-danger text-white">
                    <i className="fa fa-times " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-success text-white">
                    <i className="fa fa-check " aria-hidden="true"></i>
                  </span>
                </div>
                <h3 className="text-center bold">{t("Price.row17")}</h3>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-success text-white">
                    <i className="fa fa-check " aria-hidden="true"></i>
                  </span>
                </div>
                <h3 className="text-center bold">{t("Price.row18")}</h3>
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={12}>
            <Row className="justify-content-center bg-white">
              <Col md={3}>
                <h3 className="bold">{t("Price.row3")}</h3>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-danger text-white">
                    <i className="fa fa-times " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-danger text-white">
                    <i className="fa fa-times " aria-hidden="true"></i>
                  </span>
                </div>
              </Col>
              <Col md={3} className="center-grid">
                <div className="d-flex justify-content-center mb-4">
                  <span className="badge-circle bg-success text-white">
                    <i className="fa fa-check " aria-hidden="true"></i>
                  </span>
                </div>
                <h3 className="text-center bold">{t("Price.row19")}</h3>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Prix;
