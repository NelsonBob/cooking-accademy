import React from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  Col,
  Container,
  Row,
} from "reactstrap";

function Evenement() {
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
            <h1 className="text-white text-center">{t("Event.title")}</h1>
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
                    <CardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </CardText>
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
                    <CardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </CardText>
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
                    <CardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </CardText>
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

export default Evenement;
