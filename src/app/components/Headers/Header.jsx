import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  CardImg,
  CardText,
  Button,
} from "reactstrap";
const Header = () => {
  return (
    <>
      <div className="header bg-gradient-warning pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="4">
                <Card>
                  <CardImg
                    alt="..."
                    src="https://images.pexels.com/photos/2544829/pexels-photo-2544829.jpeg"
                    top
                  />
                  <CardBody>
                    <CardTitle>Comment cuisiner du bon poisson ?</CardTitle>
                    <Button color="primary">Suivre ce cours</Button>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card>
                  <CardImg
                    alt="..."
                    src="https://images.pexels.com/photos/2544829/pexels-photo-2544829.jpeg"
                    top
                  />
                  <CardBody>
                    <CardTitle>Comment cuisiner du bon poisson ?</CardTitle>
                    <Button color="primary">Suivre ce cours</Button>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card>
                  <CardImg
                    alt="..."
                    src="https://images.pexels.com/photos/2544829/pexels-photo-2544829.jpeg"
                    top
                  />
                  <CardBody>
                    <CardTitle>Comment cuisiner du bon poisson ?</CardTitle>
                    <Button color="primary">Suivre ce cours</Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
