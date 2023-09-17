import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Form,
  Input,
  Modal,
} from "reactstrap";
import Header from "../components/Headers/Header";
import { chartOptions, parseOptions } from "../variables/charts.js";

import Post from "../components/publications/Post";
const Chart = require("chart.js");

const Dashboard = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [isOpen, setIsOpen] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);

  const handleShowComment = (id) => {
    const tmpComments = [];
    for (let i = 0; i < id; i++) {
      tmpComments.push({
        author: "User " + i,
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. " + i,
      });
    }
    setComments(tmpComments);
    setShowComment(true);
  };

  const posts = [
    {
      id: 1,
      author: "John Doe",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Neque assumenda, delectus ratione repellat est fugit
                      explicabo consequuntur ad nostrum molestias et a expedita
                      ipsa provident odio alias, cum illo temporibus!`,
      image:
        "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg",
      created_at: "3 minutes",
    },
    {
      id: 2,
      author: "Winnie",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Neque assumenda, delectus ratione repellat est fugit
                      explicabo consequuntur ad nostrum molestias et a expedita
                      ipsa provident odio alias, cum illo temporibus!`,
      image:
        "https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg",
      created_at: "1 heure",
    },
    {
      id: 3,
      author: "Alpha Roméo",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Neque assumenda, delectus ratione repellat est fugit
                      explicabo consequuntur ad nostrum molestias et a expedita
                      ipsa provident odio alias, cum illo temporibus!`,
      image:
        "https://images.pexels.com/photos/16803393/pexels-photo-16803393/free-photo-of-nourriture-pizza-restaurant-diner.jpeg",
      created_at: "1 semaine",
    },
  ];

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const uploadImg = async (contentFile, typeaction, fileNa = "", index = 0) => {
    const formData = new FormData();
    formData.append("file", contentFile);
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <div className="d-flex justify-content-between">
                      <img
                        src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=John+Doe"
                        className="rounded-circle mr-2"
                        alt=""
                      />

                      <Button
                        color="secondary"
                        block
                        size="lg"
                        type="button"
                        onClick={() => setIsOpen(true)}
                      >
                        Commencer un post
                      </Button>
                    </div>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {posts && posts.length > 0 ? (
                  posts.map((element, index) => (
                    <Post
                      post={element}
                      comment={handleShowComment}
                      key={index}
                    />
                  ))
                ) : (
                  <h2 className="text-center">
                    Oups, aucune publication n'est encore ajoutée, faites le
                    premier pas !
                  </h2>
                )}
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Nos prochains atelier</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody></CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modale create post */}

      <Modal className="modal-dialog-centered" isOpen={isOpen}>
        <div className="modal-header">
          <h2 className="modal-title">Créer une publication</h2>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <Form role="form">
          <div className="modal-body">
            <Input placeholder="Quoi de neuf John?" rows="3" type="textarea" />
            <Input
              type="file"
              className="mt-2 btn btn-secondary"
              rows="3"
              onChange={(e) => uploadImg(e.target.files[0], "image")}
              accept="image/*"
            />
          </div>
          <div className="modal-footer justify-content-start">
            <Button color="primary" type="button">
              Publier
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Show comments */}

      <Modal className="modal-dialog-scrollable" isOpen={showComment}>
        <div className="modal-header">
          <h2 className="modal-title">Commentaire</h2>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setShowComment(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>

        <div className="modal-body">
          <div className="mb-4">
            <Form role="form">
              <Input
                placeholder="Ecrivez un commentaire..."
                rows="3"
                type="textarea"
              />

              <Button block color="primary" className="mt-2" type="button">
                Commenter
              </Button>
            </Form>
          </div>

          {comments && comments.length > 0 ? (
            comments.map((element, index) => (
              <div
                className="d-flex mt-2 border-top border-bottom py-1"
                key={index}
              >
                <div>
                  <img
                    src={
                      "https://ui-avatars.com/api/?background=0D8ABC&color=fff&size=40&name=" +
                      element.author
                    }
                    className="rounded-circle mr-2"
                    alt=""
                  />
                </div>
                <div>
                  <h4 className="mb-0">{element.author}</h4>
                  <p className="text-muted ">{element.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-2">
              Oups, aucun commentaire n'est encore ajoutée, faites le premier
              pas !
            </p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
