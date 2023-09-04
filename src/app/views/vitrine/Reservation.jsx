import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  UncontrolledCarousel,
} from "reactstrap";
import { getSalleById, readFile } from "../../service/frontendService";

const Reservation = () => {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [idSalle, setIdSalle] = useState(localStorage.getItem("idSalle"));
  useEffect(() => {
    getSalle();
  }, []);

  const getSalle = async () => {
    setTableData([]);
    try {
      const res = await getSalleById(idSalle);
      const urls = {};
      let newgal = await callGal(res.gallerie);
      urls[res.id] = newgal;
      setImageUrls(urls);
      setTableData(res);
    } catch (error) {}
  };
  const callGal = (galleries) => {
    let res = [];
    galleries.forEach(async (el) => {
      let el1 = await getFile(el);
      res.push({ fileName: el, content: el1 });
    });
    return res;
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
      <div className="header bg-info py-7 py-lg-8">
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
            <h1 className="text-white text-center">{t("Reservation.title")}</h1>
          </Col>
          <Col md={12} className="mt-5">
            <Row>
              {tableData && tableData.length > 0 ? (
                tableData.map((row, i) => (
                  <Col lg={12} key={i}>
                    <Card className="p-2">
                      <Row>
                        <Col lg={4}>
                          <UncontrolledCarousel items={imageUrls[row.id]} />

                          {/* <CardImg
                            alt="..."
                            src={imageUrls[row.id]}
                            top
                            height={300}
                            className="centered-and-covered-img "
                          /> */}
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
                          <Button variant="contained" color="primary">
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

export default Reservation;
