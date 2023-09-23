import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import ChatRoom from "../components/Chat/ChatRoom";
import { getCourById, getFile, readFile } from "../service/frontendService";

const EspaceCour = () => {
  const idCour = localStorage.getItem("idcour");
  const [videoUrl, setVideoUrl] = useState({});
  const [cour, setCour] = useState({});

  useEffect(() => {
    getCour();
  }, []);

  useEffect(() => {}, [cour]);
  const getCour = async () => {
    try {
      let id = JSON.parse(localStorage.getItem("auth"))?.userid;
      const res = await getCourById(id, idCour);
      if (res.isVideoLocal) {
        const videoUrl = await getFile(res.videoLink);
        setVideoUrl(videoUrl);
      } else {
        setVideoUrl(res.videoLink);
      }
      setCour(res);
    } catch (error) {}
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col md={6} xs={12}>
                <h5 className="text-uppercase text-white mb-0">{cour.name}</h5>
              </Col>
              <Col md={6} xs={12} className="d-flex justify-content-end">
                <Button
                  color="success"
                  type="button"
                  className="rounded-pill p-2"
                  onClick={scrollToBottom}
                >
                  <i
                    className="fa fa-comment"
                    aria-hidden="true"
                    style={{ fontSize: "x-large" }}
                  ></i>
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container className="mt--7" fluid>
        <Row>
          <Col md={12}>
            <Row>
              {cour ? (
                <>
                  <Col md={12}>
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
                  </Col>
                  <Col md={12}>
                    <h3 className="mt-4 mb-2">Descritpion</h3>
                    <p>{cour.description}</p>
                    <h3 className="mt-4 mb-2">Contenu</h3>
                    <p>{cour.contentCour}</p>
                  </Col>
                </>
              ) : (
                <Col md={12} className="d-flex justify-content-center">
                  <div className="spinner-grow text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </Col>
              )}
            </Row>
          </Col>
          {cour &&
            cour.creator &&
            cour.creator.id !=
              JSON.parse(localStorage.getItem("auth"))?.userid && (
              <Col md={12}>
                <ChatRoom receivername={cour.creator.name} idcour={idCour} />
              </Col>
            )}
        </Row>
      </Container>
    </>
  );
};
export default EspaceCour;
