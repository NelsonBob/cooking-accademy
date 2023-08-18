import React from "react";
import { Col, Row } from "reactstrap";
const AdminFooter = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="12">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <p className="font-weight-bold ml-1">Cooking Accademy</p>
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default AdminFooter;
