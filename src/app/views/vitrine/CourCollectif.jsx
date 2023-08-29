import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardImg, CardText, Col, Container, Row } from "reactstrap";
import { getListCourActif, readFile } from "../../service/frontendService";

const CourCollectif = () => {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setTableData([]);
    try {
      const res = await getListCourActif();
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
            <h1 className="text-white text-center">{t("Cour.title")}</h1>
          </Col>
          <Col md={12} className="mt-5">
            <Row className="row-grid">
              {tableData && tableData.length > 0 ? (
                tableData.map((row) => (
                  <Col lg={4}  style={{ cursor: "pointer" }}>
                    <Card>
                      <CardImg
                        alt="..."
                        src={imageUrls[row.id]}
                        top
                        height={300}
                        className="centered-and-covered-img "
                      />
                      <div className="p-3">
                        <CardText>{row.name}</CardText>
                      </div>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col lg={12}>
                  <h2 className="text-center">Aucun cour trouvé</h2>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CourCollectif;
