import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Container,
  Modal,
  Row
} from "reactstrap";
import {
  getAuthUser,
  getFile,
  getLast3Cours,
} from "../../service/frontendService";
const Header = () => {
  const [tableData, setTableData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [videoModal, setVideoModal] = useState(false);
  const [name, setName] = useState("");
  const [contentCour, setContentCour] = useState("");
  const [typeAction, setTypeAction] = useState(null);
  const [description, setDescription] = useState(null);
  const [videoUrl, setVideoUrl] = useState({});
  const [idcour, setIdcour] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    getLastCour();
  }, []);
  const getLastCour = async () => {
    const res = await getLast3Cours(getAuthUser().id);
    const urls = {};
    for (const row of res) {
      const imgUrl = await getFile(row.imgPath);
      urls[row.id] = imgUrl;
    }
    setImageUrls(urls);
    setTableData(res);
  };
  const handleClose = () => setVideoModal(!videoModal);
  useEffect(() => {}, [tableData]);
  useEffect(() => {}, [typeAction]);
  useEffect(() => {}, [videoModal]);
  const previewVideo = async (
    id,
    video,
    title,
    content,
    desc,
    isloc,
    typeActi
  ) => {
    setIdcour(id);
    if (isloc) {
      const videoUrl = await getFile(video);
      setVideoUrl(videoUrl);
    } else {
      setVideoUrl(video);
    }
    setName(title);
    setContentCour(content);
    setDescription(desc);
    setVideoModal(true);
    setTypeAction(typeActi);
  };
  const handleVisualiser = () => {
    localStorage.setItem("idcour", idcour);
    handleClose();
    return navigate("/in/lesson");
  };

  return (
    <>
      <div className="header bg-gradient-warning pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              {tableData && tableData.length > 0 ? (
                tableData.map((row, index) => (
                  <Col lg="6" xl="4" key={index}>
                    <Card>
                      <CardImg alt="..." src={imageUrls[row.id]} top />
                      <CardBody>
                        <CardTitle>{row.name}</CardTitle>
                        <Button
                          color="primary"
                          onClick={() =>
                            previewVideo(
                              row.id,
                              row.videoLink,
                              row.name,
                              row.contentCour,
                              row.description,
                              row.isVideoLocal,
                              "previsualiser"
                            )
                          }
                        >
                          Suivre ce cours
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                ))
              ) : (
                <></>
              )}
              <Modal
                className="modal-dialog-centered"
                isOpen={videoModal}
                toggle={handleClose}
              >
                <div className="modal-header">
                  <h5 className="modal-title">{name} </h5>
                  <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={handleClose}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  {typeAction == "visualiser" ? (
                    <div className="embed-responsive embed-responsive-16by9">
                      <iframe
                        className="embed-responsive-item"
                        src={videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <Button
                      color="primary"
                      className="btn-block"
                      onClick={() => handleVisualiser()}
                    >
                      Regarder la video
                    </Button>
                  )}
                  <h3 className="mt-4 mb-2">Descritpion</h3>
                  <p>{description}</p>
                  <h3 className="mt-4 mb-2">Contenu</h3>
                  <p>{contentCour}</p>
                </div>
                <div className="modal-footer">
                  <Button
                    color="secondary"
                    data-dismiss="modal"
                    type="button"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </div>
              </Modal>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
