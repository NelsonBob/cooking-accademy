import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardImg, Col, Container, Row } from "reactstrap";
import { getListRepasActif, readFile } from "../../service/frontendService";

function Home() {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setTableData([]);
    try {
      const res = await getListRepasActif();
      const urls = {};
      for (const row of res) {
        const imgUrl = await getFile(row.imgPath);
        urls[row.id] = imgUrl;
      }
      setImageUrls(urls);
      setTableData(res);
    } catch (error) {}
  };
  const getFile = async (url) => {
    try {
      const response = await readFile(url);
      const imgUrl = URL.createObjectURL(response);
      return imgUrl;
    } catch (error) {
      console.error("Error displaying file:", error);
    }
  };
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
              {tableData && tableData.length > 0 ? (
                tableData.map((row, i) => (
                  <Col lg={4} key={i}>
                    <Card className="card-food py-3 center-grid">
                      <p className="text-center font-weight-500">{row.name}</p>
                      <p className="text-center"> €{row.price}</p>
                      <div className="center-grid mb-4">
                        <a className="btn-by" href="#">
                          <i
                            className="fa fa-shopping-basket"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                      <div className="center-grid">
                        <CardImg
                          alt="..."
                          src={imageUrls[row.id]}
                          top
                          width={250}
                          height={250}
                          className="centered-and-covered-img"
                        />
                      </div>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col lg={12}>
                  <h2 className="text-center">Aucun repas disponible</h2>
                </Col>
              )}
            </Row>
          </Col>
          <Col md={6} xs={12} className="my-6">
            <h1 className="">{t("Home.chef")}</h1>
            <p className=" mt-2">{t("Home.chefcmmentaire")}</p>
            <p className="mt-4">{t("Home.chefcmmentaire1")}</p>
          </Col>
          <Col md={6} xs={12} className="my-6">
            <Row>
              <Col lg={6} className="center-grid">
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
              <Col lg={6} className="center-grid">
                <img
                  alt="..."
                  width={150}
                  height={150}
                  src={require("../../../assets/img/chefs/chef3-free-img.png")}
                />
                <h1 className="text-center mt-2">Suzanne Grey</h1>
                <p className="description text-center">Chef cuisinier</p>
              </Col>
              <Col lg={6} className="center-grid">
                <img
                  alt="..."
                  width={150}
                  height={150}
                  src={require("../../../assets/img/chefs/chef2-free-img.png")}
                />
                <h1 className="text-center mt-2">James Lee</h1>
                <p className="description text-center">Co-fondateur / Chef</p>
              </Col>
              <Col lg={6} className="center-grid">
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
