import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import {
  getAuthUser,
  getFile,
  getLast3Cours,
} from "../../service/frontendService";
import CourItem from "../Cour/CourItem";

const Header = () => {
  const [lessons, setLessons] = useState([]);

  const getLastCour = async () => {
    let res = await getLast3Cours(getAuthUser().id);
    if (res) {
      for (const element of res) {
        element.imgPath = await getFile(element.imgPath);
      }

      setLessons(res);
    }
  };

  useEffect(() => {
    getLastCour();
  }, []);

  return (
    <>
      <div className="header bg-gradient-warning pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              {lessons && lessons.length > 0 ? (
                lessons.map((element, index) => (
                  <Col xs="12" md="4" className="mt-2" key={index}>
                    <CourItem lesson={element} />
                  </Col>
                ))
              ) : (
                <Col>
                  <h2>Aucun cous pour le moment</h2>
                </Col>
              )}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
