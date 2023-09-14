import React, { useEffect, useState } from "react";
import { Button, Col, Container, FormGroup, Row } from "reactstrap";
import ChatRoom from "../components/Chat/ChatRoom";
import { getFile, getUserMessageCourById } from "../service/frontendService";

const MessageCour = () => {
  const [imageUrls, setImageUrls] = useState({});
  const idCour = localStorage.getItem("idcour");
  const [receiverUser, setReceiverUser] = useState("");
  const [tableData, setTableData] = useState([]);
  const [itemMessage, setItemMessage] = useState({});

  useEffect(() => {
    getMessages();
  }, []);
  useEffect(() => {}, [itemMessage, receiverUser]);

  const getMessages = async () => {
    try {
      let id = JSON.parse(localStorage.getItem("auth")).userid;
      const res = await getUserMessageCourById(id, idCour);
      const urls = {};
      for (const row of res) {
        const imgUrl = await getFile(row.imgPath);
        urls[row.id] = imgUrl;
      }
      setImageUrls(urls);
      setTableData(res);
    } catch (error) {}
  };

  return (
    <>
      {" "}
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col md={12}>
                <h5 className="text-uppercase text-white mb-0">
                  Liste des notifications
                </h5>
              </Col>
              <Col md={12} className="d-md-flex justify-content-between mt-5">
                <FormGroup md={6}>
                  <Button color="info" type="button">
                    <i className="fa fa-refresh" aria-hidden="true"></i>{" "}
                    Actualiser
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container className="mt--7" fluid>
        <Row className="d-flex align-items-center">
          <Col md={4}>
            {tableData.length > 0 &&
              tableData.map((chat, index) => (
                <Row key={index}>
                  <Col md={4}>
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={imageUrls[chat.user.id]}
                        width={50}
                        height={50}
                      />
                    </span>
                  </Col>
                  <Col md={12}>{chat.user.name}</Col>
                  <Col md={12}>
                    <hr />
                  </Col>
                </Row>
              ))}
          </Col>
          <Col md={8}>
            {itemMessage ? (
              <ChatRoom receivername={receiverUser} idcour={idCour} />
            ) : (
              <div className="d-flex align-items-center justify-content-center">
                <h2>Notification cooking</h2>
                <p>
                  Bienvenu sur vos notifications cooking recu concernant vos
                  cours
                </p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MessageCour;
