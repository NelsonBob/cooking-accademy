import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardImg, CardText, Col, Container, Row } from "reactstrap";
import { getListEventAll, readFile } from "../../service/frontendService";
import moment from "moment";

function Evenement() {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setTableData([]);
    try {
      const res = await getListEventAll();
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

  const depart = (dat) => {
    return moment(dat).format("LL");
  };
  const debutfin = (dat) => {
    return moment(dat).format("LT");
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
            <h1 className="text-white text-center">{t("Event.title")}</h1>
          </Col>
          <Col md={12} className="mt-4">
            <Row className="row-grid">
              {tableData && tableData.length > 0 ? (
                tableData.map(
                  (row, i) =>
                    new Date(row.end) > new Date() && (
                      <Col
                        lg={4}
                        className="mt-3"
                        key={i}
                        style={{ cursor: "pointer" }}
                      >
                        <Card>
                          <CardImg
                            alt="..."
                            src={imageUrls[row.id]}
                            top
                            height={300}
                            className="centered-and-covered-img "
                          />
                          <div className="p-3">
                            <CardText>{row.title}</CardText>
                            <p>
                              {depart(row.start) + " de "}{" "}
                              <span className="text-muted">
                                {" "}
                                {debutfin(row.start) +
                                  " to " +
                                  debutfin(row.end)}
                              </span>
                            </p>
                          </div>
                        </Card>
                      </Col>
                    )
                )
              ) : (
                <Col lg={12}>
                  <h2 className="text-center">Aucun evenement trouvé</h2>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Evenement;
