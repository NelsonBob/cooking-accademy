import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import ChatRoom from "../components/Chat/ChatRoom";
import { getFile, getUserMessageCourById } from "../service/frontendService";

const MessageCour = () => {
  const [imageUrls, setImageUrls] = useState({});
  const idCour = localStorage.getItem("idcour");
  const [receiverUser, setReceiverUser] = useState("");
  const [tableData, setTableData] = useState([]);
  const [itemMessage, setItemMessage] = useState({});
  const [position, setPosition] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMessages();
  }, []);
  useEffect(() => {}, [itemMessage, receiverUser]);
  useEffect(() => {}, [position]);

  const getMessages = async () => {
    try {
      let id = JSON.parse(localStorage.getItem("auth")).userid;
      const res = await getUserMessageCourById(id, idCour);
      const urls = {};
      for (const row of res) {
        let imgUrl = "";
        if (row.imgPath) imgUrl = await getFile(row.imgPath);
        urls[row.id] = imgUrl;
      }
      setImageUrls(urls);
      setTableData(res);
    } catch (error) {}
  };
  const handleClickChat = (element, index) => {
    setReceiverUser(element.name);
    setItemMessage(element);
    setPosition(index);
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
                  Liste des notifications du cour
                </h5>
              </Col>
              <Col md={12} className="d-md-flex justify-content-between mt-5">
                <FormGroup md={6}>
                  <Button color="info" type="button">
                    <i className="fa fa-refresh" aria-hidden="true"></i>{" "}
                    Actualiser
                  </Button>
                </FormGroup>

                <FormGroup md={6}>
                  <Button
                    color="success"
                    type="button"
                    onClick={() => navigate("/in/cour")}
                  >
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>{" "}
                    Retour
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container className="mt--7" fluid>
        <Row>
          <Col md={12}>
            <Card className="bg-gradient-default shadow">
              <CardBody>
                <Row>
                  <Col md={12}>
                    {itemMessage && itemMessage.name ? (
                      <></>
                    ) : (
                      <Alert className="alert-dark">
                        <strong>Notification cooking!</strong> Bienvenu sur vos
                        notifications cooking recu concernant vos cours
                      </Alert>
                    )}
                  </Col>

                  <Col md={4} className="pl-2 pt-4">
                    {tableData.length > 0 &&
                      tableData.map((user, index) => (
                        <Row
                          key={index}
                          onClick={() => handleClickChat(user, index)}
                          className={
                            receiverUser && receiverUser == user.name
                              ? "d-flex align-items-center bg-dark text-white"
                              : "d-flex align-items-center"
                          }
                          style={{cursor:'pointer'}}
                        >
                          <Col md={4}>
                            <span className="avatar avatar-sm rounded-circle">
                              {imageUrls[user.id] ? (
                                <img
                                  alt="..."
                                  src={require(imageUrls[user.id])}
                                  width={50}
                                  height={50}
                                />
                              ) : (
                                <img
                                  alt="..."
                                  src={require("./../../assets/img/brand/icon-4399701_1280.webp")}
                                  width={50}
                                  height={50}
                                />
                              )}
                            </span>
                          </Col>
                          <Col md={8}>{user.name}</Col>
                          {tableData.length - 1 > index && (
                            <Col md={12}>
                              <hr className="my-2" />
                            </Col>
                          )}
                        </Row>
                      ))}
                  </Col>
                  <Col md={8}>
                    {itemMessage && itemMessage.name && (
                      <ChatRoom receivername={receiverUser} idcour={idCour} />
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MessageCour;
