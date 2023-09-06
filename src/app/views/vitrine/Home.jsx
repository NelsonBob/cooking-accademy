import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "react-use-cart";
import { Card, CardImg, Col, Container, Row } from "reactstrap";
import {
  getListInternChef,
  getListRepasActif,
  readFile,
} from "../../service/frontendService";

function Home() {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [imageUrls1, setImageUrls1] = useState({});

  useEffect(() => {
    getList();
    getListChefs();
  }, []);

  const getList = async () => {
    setTableData([]);
    try {
      const res = await getListRepasActif();
      const tab = [];
      for (const row of res) {
        const imgUrl = await getFile(row.imgPath);
        tab.push({
          price: row.price,
          id: row.id,
          name: row.name,
          imgUrl,
          type: "Repas",
        });
      }
      setTableData(tab);
    } catch (error) {}
  };
  const getListChefs = async () => {
    setTableData1([]);
    try {
      const res = await getListInternChef();
      const urls = {};
      for (const row of res) {
        let imgUrl;
        if (row.imgPath) imgUrl = await getFile(row.imgPath);
        else
          imgUrl = require("../../../assets/img/brand/icon-4399701_1280.webp");

        urls[row.id] = imgUrl;
      }
      setImageUrls1(urls);
      setTableData1(res);
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
  const { addItem } = useCart();
  const handleAddToCart = (row) => {
    addItem(row);
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
                      <div
                        className="center-grid mb-4"
                        onClick={() => handleAddToCart(row)}
                      >
                        <button className="btn-by" type="button">
                          <i
                            className="fa fa-shopping-basket"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </div>
                      <div className="center-grid">
                        <CardImg
                          alt="..."
                          src={row.imgUrl}
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
              {tableData1 && tableData1.length == 4 ? (
                tableData1.map((row, i) => (
                  <Col lg={6} className="center-grid" key={i}>
                    <img
                      alt="..."
                      width={150}
                      height={150}
                      src={imageUrls1[row.id]}
                    />
                    <h1 className="text-center mt-2">{row.name}</h1>
                    <p className="description text-center">{row.fonction}</p>
                  </Col>
                ))
              ) : (
                <>
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
                    <p className="description text-center">
                      Co-fondateur / Chef
                    </p>
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
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
