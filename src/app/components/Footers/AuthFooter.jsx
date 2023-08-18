import React from "react";
import { Col, Container, Row } from "reactstrap";
const AuthFooter = () => {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="12">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}{" "}
                <p className="font-weight-bold ml-1">Cooking Accademy</p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default AuthFooter;
