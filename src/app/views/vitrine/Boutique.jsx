import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";

function Boutique() {
  const { t } = useTranslation();

  return (
    <>
      <div className="header bg-img-party py-7 py-lg-8">
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
            <h1 className="text-white text-center">{t("Market.title")}</h1>
          </Col>
          <Col md={12} className="mt-5">
            <Row className="row-grid">
              <Col lg={4}>
                <Card>
                  <CardImg
                    alt="..."
                    src={require("../../../assets/img/cour/cour.jpg")}
                    top
                    height={300}
                    className="centered-and-covered-img "
                  />
                  <div className="p-3">
                    <CardTitle>
                      <h3 className="bold">Cuilliere</h3>
                    </CardTitle>
                    <CardText className="color-footer">$25</CardText>
                    <button className="btn btn-primary btn-block" type="button">
                      Commander
                    </button>
                  </div>
                </Card>
              </Col>
              <Col lg={4}>
                <Card>
                  <CardImg
                    alt="..."
                    src={require("../../../assets/img/cour/cour1.jpg")}
                    top
                    height={300}
                    className="centered-and-covered-img "
                  />
                   <div className="p-3">
                    <CardTitle>
                      <h3 className="bold">Cuilliere</h3>
                    </CardTitle>
                    <CardText className="color-footer">$25</CardText>
                    <button className="btn btn-primary btn-block" type="button">
                      Commander
                    </button>
                  </div>
                </Card>
              </Col>
              <Col lg={4}>
                <Card>
                  <CardImg
                    alt="..."
                    src={require("../../../assets/img/cour/cour2.jpg")}
                    top
                    height={300}
                    className="centered-and-covered-img "
                  />
                  <div className="p-3">
                    <CardTitle>
                      <h3 className="bold">Cuilliere</h3>
                    </CardTitle>
                    <CardText className="color-footer">$25</CardText>
                    <button className="btn btn-primary btn-block" type="button">
                      Commander
                    </button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Boutique;
