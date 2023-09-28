import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Col, Container, Row } from "reactstrap";
import {
  getAuthUser,
  getListEventAll,
  listEventFutur,
} from "../../service/frontendService";

function Evenement() {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setTableData([]);
    try {
      if (localStorage.getItem("auth") !== null) {
        const res = await listEventFutur(getAuthUser().id);
        setTableData(res);
      } else {
        const res = await getListEventAll();
        setTableData(res);
      }
    } catch (error) {}
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
                  (row, index) =>
                    new Date(row.end) > new Date() && (
                      <Col className="list-group" key={index}>
                        <div
                          md={3}
                          className="list-group-item list-group-item-action "
                        >
                          {row.title}
                          <br />
                          Description : {row.description}
                          <br />
                          Date : {moment(row.start).format("LL")}
                          <br />
                          Heure :{" "}
                          {moment(row.start).format("LT") +
                            " - " +
                            moment(row.end).format("LT")}
                          <br />
                          {JSON.parse(localStorage.getItem("auth"))?.userid && (
                            <Button
                              className="mt-2"
                              color={row.isRegister ? "danger" : "primary"}
                              onClick={() => suivre(row.id)}
                            >
                              {row.isRegister ? "Desinscrire" : "Participer"}
                            </Button>
                          )}
                        </div>
                      </Col>
                    )
                )
              ) : (
                <h2 className="text-center">Aucun evenement trouvé</h2>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Evenement;
