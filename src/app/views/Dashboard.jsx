import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Modal,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import Header from "../components/Headers/Header";
import Post from "../components/publications/Post";
import {
  UploadFile,
  addComment,
  addPost,
  checkEventUser,
  checkLike,
  getAuthUser,
  getFile,
  getOnePost,
  listEventFutur,
  loadPost,
  sharePost,
} from "../service/frontendService";

const Dashboard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState([]);
  const [postInput, setPostInput] = useState();
  const [postId, setPostId] = useState();
  const [posts, setPosts] = useState();
  const [postInputErros, setPostInputErros] = useState();
  const [postImagePath, setImagePath] = useState();
  const [tableData, setTableData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  const handleShowComment = async (id) => {
    setPostId(id);
    const response = await getOnePost(getAuthUser().id, id);
    setComments(response.comments);
    setShowComment(true);
  };

  const uploadImg = async (contentFile, typeaction, fileNa = "", index = 0) => {
    if (contentFile) {
      const formData = new FormData();
      formData.append("file", contentFile);
      const response = await UploadFile(formData);
      setImagePath(response);
    }
  };

  const validateForm = () => {
    let isValide = true;
    if (!postInput) {
      isValide = false;
      setPostInputErros("Ce champ est obligatoire");
    } else {
      setPostInputErros("");
    }

    return isValide;
  };

  const savePost = async () => {
    if (validateForm()) {
      let data = {
        datepost: new Date(),
        description: postInput,
        imgPath: postImagePath ?? "",
      };
      await addPost(getAuthUser().id, data);

      Swal.fire({
        title: "Votre poste a bien été publié.",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "bg-success",
        },
      });

      setPostInput("");
      setImagePath("");
      getPost();
      setIsOpen(false);
    }
  };

  const saveComment = async () => {
    if (commentInput) {
      let data = {
        description: commentInput,
        post: postId,
      };
      await addComment(getAuthUser().id, data);
      Swal.fire({
        title: "Votre commentaire a bien été ajouté.",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "bg-success",
        },
      });
      getPost();
      setComments([]);
      setShowComment(false);
    }
  };

  const getPost = async () => {
    const res = await loadPost(getAuthUser().id);
    const urls = {};
    for (const row of res) {
      const imgUrl = await getFile(row.imgPath);
      urls[row.id] = imgUrl;
    }
    setImageUrls(urls);
    setPosts(res);
  };
  const getEventF = async () => {
    const res = await listEventFutur(getAuthUser().id);
    setTableData(res);
  };
  const suivre = async (idevent) => {
    let data = {
      statusEvent: "Confirm",
      id: idevent,
    };
    await checkEventUser(getAuthUser().id, data);
    getEventF();
  };
  useEffect(() => {
    getPost();
    getEventF();
  }, []);
  useEffect(() => {}, [tableData]);

  const handleLike = async (id) => {
    setPostId(id);
    await checkLike(getAuthUser().id, id);
    getPost();
  };
  const handleShare = async (id) => {
    setPostId(id);
    let data = {
      id,
      datepost: new Date(),
    };
    await sharePost(getAuthUser().id, data);
    getPost();
    scrollToTop();
  };
  const scrollToTop = () => {
    window.scrollTo(0, 0);
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
                        src={
                          getAuthUser().picture
                            ? getAuthUser().picture
                            : "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" +
                              getAuthUser().name
                        }
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
                      imageUrls={imageUrls[element.id]}
                      comment={handleShowComment}
                      like={handleLike}
                      share={handleShare}
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
                    <h2 className="mb-0">Nos prochains évènement</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="list-group">
                  {tableData && tableData.length > 0 ? (
                    tableData.map(
                      (row, index) =>
                        new Date(row.end) > new Date() && (
                          <div
                            className="list-group-item list-group-item-action "
                            key={index}
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
                            <Button
                              className="mt-2"
                              color={row.isRegister ? "danger" : "primary"}
                              onClick={() => suivre(row.id)}
                            >
                              {row.isRegister ? "Desinscrire" : "Participer"}
                            </Button>
                          </div>
                        )
                    )
                  ) : (
                    <></>
                  )}
                </div>
              </CardBody>
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
            <Input
              placeholder="Quoi de neuf John?"
              rows="3"
              type="textarea"
              onChange={(e) => setPostInput(e.target.value)}
            />
            {postInputErros != "" ? (
              <span className="text-danger">{postInputErros}</span>
            ) : (
              ""
            )}
            <Input
              type="file"
              className="mt-2 btn btn-secondary"
              rows="3"
              onChange={(e) => uploadImg(e.target.files[0], "image")}
              accept="image/*"
            />
          </div>
          <div className="modal-footer justify-content-start">
            <Button color="primary" type="button" onClick={savePost}>
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
                onChange={(e) => setCommentInput(e.target.value)}
              />

              <Button
                block
                color="primary"
                className="mt-2"
                type="button"
                onClick={saveComment}
              >
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
                      element.author.name
                    }
                    className="rounded-circle mr-2"
                    alt=""
                  />
                </div>
                <div>
                  <h4 className="mb-0">{element.author.name}</h4>
                  <p className="text-muted ">{element.description}</p>
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
