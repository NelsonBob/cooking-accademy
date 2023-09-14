import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";
import {
  getFile,
  getListOptionAbonnementActif,
  getListServiceAbonnementActif,
  readFile,
} from "../../service/frontendService";

function Prix() {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    getList();
    getListService();
  }, []);
  const getList = async () => {
    setTableData([]);
    try {
      const res = await getListServiceAbonnementActif();
      const urls = {};
      for (const row of res) {
        const imgUrl = await getFile(row.imgPath);
        urls[row.id] = imgUrl;
      }
      setImageUrls(urls);
      setTableData(res);
    } catch (error) {}
  };
  const getListService = async () => {
    setTableData1([]);
    try {
      const res = await getListOptionAbonnementActif();
      res.sort(compareByServiceAbonnementId)
      setTableData1(res);
    } catch (error) {}
  };
  const compareByServiceAbonnementId  = (a, b) => {
    const idA = a.optionServiceAbonnement[0]?.serviceAbonnement.id || 0;
    const idB = b.optionServiceAbonnement[0]?.serviceAbonnement.id || 0;

    return idA - idB;
  };

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
            <Row className="justify-content-center bg-white pt-4 align-items-center">
              <Col md={3}>
                <h3 className="bold">{t("Price.row1")}</h3>
                <span className="bold">{t("Price.row2")}</span> 
              </Col>
              {tableData && tableData.length > 0 ? (
                tableData.map((row, i) => (
                  <Col md={3} key={i} className="center-grid">
                    <img
                      alt="..."
                      width={80}
                      height={100}
                      src={imageUrls[row.id]}
                    />
                    <h2 className="text-center">{row.name}</h2>
                    <p
                      className="text-center font-italic"
                      style={{ width: "6rem" }}
                    >
                      {row.description}
                    </p>
                  </Col>
                ))
              ) : (
                <Col lg={12}>
                  <h2 className="text-center">Aucune service trouvé</h2>
                </Col>
              )}
            </Row>
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          {tableData1 && tableData1.length > 0 ? (
            tableData1.map((row, i) => (
              <>
                <Col md={3} className="d-flex align-items-center">
                  <h3 className="bold">{row.name}</h3>
                </Col>
                {row.optionServiceAbonnement.map((row1, inde) => (
                  <Col md={3} className="center-grid" key={inde}>
                    <div className={row1.icon && row1.description?"text-center":"d-flex justify-content-center align-items-center "}>
                      {row1.icon && (
                        <span
                          className={
                            row1.isValueicon
                              ? "badge-circle bg-success text-white"
                              : "badge-circle bg-danger text-white"
                          }
                        >
                          <i
                            className={
                              row1.isValueicon ? "fa fa-check" : "fa fa-times"
                            }
                            aria-hidden="true"
                          ></i>
                        </span>
                      )}
                      {row1.description && (
                        <h3 className="text-center bold">
                          {row1.descriptionvalue}
                        </h3>
                      )}
                    </div>
                  </Col>
                ))}
                <Col xs={12}>
                  <hr />
                </Col>
              </>
            ))
          ) : (
            <Col lg={12}>
              <h2 className="text-center">Aucune option trouvé</h2>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}

export default Prix;
