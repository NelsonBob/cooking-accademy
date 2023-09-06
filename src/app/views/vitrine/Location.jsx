import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardImg,
  Col,
  Container,
  Row,
  UncontrolledCarousel,
} from "reactstrap";
import { getListSalleActif, readFile } from "../../service/frontendService";
import { useNavigate } from "react-router-dom";

const Location = () => {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    localStorage.removeItem("idSalle");
    getList();
  }, []);

  const getList = async () => {
    setTableData([]);
    try {
      const res = await getListSalleActif();
      const urls = {};
      for (const row of res) {
        let newgal = await callGal(row.gallerie);
        urls[row.id] = newgal;
      }
      setImageUrls(urls);
      setTableData(res);
    } catch (error) {}
  };
  const callGal = (galleries) => {
    let lienurl = [];
    galleries.forEach(async (el, index) => {
      const elUrl = await getFile(el);
      lienurl.push({ src: elUrl, key: index, caption: "" });
    });
    return lienurl;
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
  const reserve = (id) => {
    console.log("salle id", id);
    localStorage.setItem("idSalle", id);
    return navigate("/out/reservation");
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="header bg-img-location py-7 py-lg-8">
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
            <h1 className="text-white text-center">{t("Location.title")}</h1>
          </Col>
          <Col md={12} className="mt-5">
            <Row>
              {tableData && tableData.length > 0 ? (
                tableData.map((row, i) => (
                  <Col lg={12} key={i}>
                    <Card className="p-2">
                      <Row>
                        <Col lg={4}>
                          {imageUrls && imageUrls[row.id] && (
                            <UncontrolledCarousel
                              items={imageUrls[row.id]}
                              className="location" 
                            />
                          )}
                        </Col>
                        <Col
                          lg={8}
                          className="d-flex align-items-start flex-column"
                        >
                          <h2>{row.name}</h2>
                          <p>{row.description}</p>
                          <p>
                            <i className="fa fa-star text-warning"></i>
                            <i className="fa fa-star text-warning"></i>
                            <i className="fa fa-star text-warning"></i>
                          </p>
                          <a href="#">Lire les avis Google</a>
                          <br />
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => reserve(row.id)}
                          >
                            Réserver
                          </Button>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col lg={12}>
                  <h2 className="text-center">Aucune location trouvée</h2>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Location;
