import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";

function Home() {
  const { t } = useTranslation();

  return (
    <>
      <div className="header bg-img-home py-7 py-lg-8">
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
            <h1 className="text-white text-center">{t("Home.title1")}</h1>
          </Col>
          <Col md={12} className="mt-5">
            <Row className="row-grid">
              <Col lg={4}>
                <Card className="card-food pt-3 d-flex justify-content-center">
                  <p className="text-center font-weight-500">
                    Poulet grillé et frit
                  </p>
                  <p className="text-center">$20.00</p>
                  <div className="d-flex justify-content-center mb-4">
                    <a className="btn-by" href="#">
                      <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    </a>
                  </div>
                  <CardImg
                    alt="..."
                    src={require("../../../assets/img/repas/food6-free-img.png")}
                    top
                    width={250}
                    height={250}
                    className="centered-and-covered-img"
                  />
                </Card>
              </Col>
              <Col lg={4}>
                <Card className="card-food pt-3 d-flex justify-content-center">
                  <p className="text-center font-weight-500">
                    Filet de saumon grillé avec salade
                  </p>
                  <p className="text-center">$20.00</p>
                  <div className="d-flex justify-content-center mb-4">
                    <a className="btn-by" href="#">
                      <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    </a>
                  </div>
                  <CardImg
                    alt="..."
                    src={require("../../../assets/img/repas/food5-free-img.png")}
                    top
                    width={250}
                    height={250}
                    className="centered-and-covered-img"
                  />
                </Card>
              </Col>
              <Col lg={4}>
                <Card className="card-food pt-3 d-flex justify-content-center">
                  <p className="text-center font-weight-500">
                    Steak de maquereau grillé
                  </p>
                  <p className="text-center">$18.00</p>
                  <div className="d-flex justify-content-center mb-4">
                    <a className="btn-by" href="#">
                      <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    </a>
                  </div>
                  <CardImg
                    alt="..."
                    src={require("../../../assets/img/repas/food3-free-img.png")}
                    top
                    width={250}
                    height={250}
                    className="centered-and-covered-img"
                  />
                </Card>
              </Col>
              <Col lg={4} className="mt-4">
                <Card className="card-food pt-3 d-flex justify-content-center">
                  <p className="text-center font-weight-500">
                    Poulet à la sauce Teriyaki
                  </p>
                  <p className="text-center">$47.00</p>
                  <div className="d-flex justify-content-center mb-4">
                    <a className="btn-by" href="#">
                      <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    </a>
                  </div>
                  <CardImg
                    alt="..."
                    src={require("../../../assets/img/repas/food4-free-img.png")}
                    top
                    width={250}
                    height={250}
                    className="centered-and-covered-img"
                  />
                </Card>
              </Col>
              <Col lg={4} className="mt-4">
                <Card className="card-food pt-3 d-flex justify-content-center">
                  <p className="text-center font-weight-500">
                    Nuggets de poulet avec pommes de terre
                  </p>
                  <p className="text-center">$25.00</p>
                  <div className="d-flex justify-content-center mb-4">
                    <a className="btn-by" href="#">
                      <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    </a>
                  </div>
                  <CardImg
                    alt="..."
                    src={require("../../../assets/img/repas/food-dish-06.png")}
                    top
                    width={250}
                    height={250}
                    className="centered-and-covered-img"
                  />
                </Card>
              </Col>
              <Col lg={4} className="mt-4">
                <Card className="card-food pt-3 d-flex justify-content-center">
                  <p className="text-center font-weight-500">
                    Spaghetti au maquereau grillé
                  </p>
                  <p className="text-center">$30.00</p>
                  <div className="d-flex justify-content-center mb-4">
                    <a className="btn-by" href="#">
                      <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    </a>
                  </div>
                  <CardImg
                    alt="..."
                    src={require("../../../assets/img/repas/food-dish-05.png")}
                    top
                    width={250}
                    height={250}
                    className="centered-and-covered-img"
                  />
                </Card>
              </Col>
            </Row>
          </Col>
          <Col md={6} xs={12} className="my-6">
            <h1 className="">{t("Home.chef")}</h1>
            <p className=" mt-2">{t("Home.chefcmmentaire")}</p>
            <p className="mt-4">{t("Home.chefcmmentaire1")}</p>
          </Col>
          <Col md={6} xs={12} className="my-6">
            <Row>
              <Col
                lg={6}
                className="justify-content-center"
                style={{ display: "grid" }}
              >
                <img
                  alt="..."
                  width={150}
                  height={150}
                  src={require("../../../assets/img/chefs/chef1-free-img.png")}
                />
                <h1 className="text-center mt-2">Arthur Lee</h1>
                <p className="description text-center">
                  Fondateur / Chef de cuisine
                </p>
              </Col>
              <Col
                lg={6}
                className="justify-content-center"
                style={{ display: "grid" }}
              >
                <img
                  alt="..."
                  width={150}
                  height={150}
                  src={require("../../../assets/img/chefs/chef3-free-img.png")}
                />
                <h1 className="text-center mt-2">Suzanne Grey</h1>
                <p className="description text-center">Chef cuisinier</p>
              </Col>
              <Col
                lg={6}
                className="justify-content-center"
                style={{ display: "grid" }}
              >
                <img
                  alt="..."
                  width={150}
                  height={150}
                  src={require("../../../assets/img/chefs/chef2-free-img.png")}
                />
                <h1 className="text-center mt-2">James Lee</h1>
                <p className="description text-center">Co-fondateur / Chef</p>
              </Col>
              <Col
                lg={6}
                className="justify-content-center"
                style={{ display: "grid" }}
              >
                <img
                  alt="..."
                  width={150}
                  height={150}
                  src={require("../../../assets/img/chefs/chef4-free-img.png")}
                />
                <h1 className="text-center mt-2">Max Broody</h1>
                <p className="description text-center">
                  Chef du petit-déjeuner
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
