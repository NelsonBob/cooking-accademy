import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, CardImg, CardText, Col, Container, Modal, Row } from "reactstrap";
import {
  getFile,
  getListCourActif,
  readFile,
} from "../../service/frontendService";

const CourCollectif = () => {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [name, setName] = useState("");
  const [contentCour, setContentCour] = useState("");
  const [description, setDescription] = useState(null);
  const [videoModal, setVideoModal] = useState(false);

  useEffect(() => {
    getList();
  }, []);
  useEffect(() => {}, [videoModal]);
  const handleClose = () => setVideoModal(!videoModal);
  const getList = async () => {
    setTableData([]);
    try {
      const res = await getListCourActif();
      const urls = {};
      for (const row of res) {
        const imgUrl = await getFile(row.imgPath);
        urls[row.id] = imgUrl;
      }
      setImageUrls(urls);
      setTableData(res);
    } catch (error) {}
  };
  const previewVideo = async (title, content, desc) => {
    setName(title);
    setContentCour(content);
    setDescription(desc);
    setVideoModal(true);
  };
  return (
    <>
      <div className="header bg-img-party py-7 py-lg-8">
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-default" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </div>
      <Container className="mt--8 pb-5 position-relative">
        <Row className="justify-content-center">
          <Col md={12} className="my-4">
            <h1 className="text-white text-center">{t("Cour.title")}</h1>
          </Col>
          <Col md={12} className="mt-5">
            <Row className="row-grid">
              {tableData && tableData.length > 0 ? (
                tableData.map((row, i) => (
                  <Col
                    lg={4}
                    key={i}
                    onClick={() =>
                      previewVideo(row.name, row.contentCour, row.description)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <Card>
                      <CardImg
                        alt="..."
                        src={imageUrls[row.id]}
                        top
                        height={300}
                        className="centered-and-covered-img "
                      />
                      <div className="p-3">
                        <CardText>{row.name}</CardText>
                      </div>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col lg={12}>
                  <h2 className="text-center">Aucun cour trouvé</h2>
                </Col>
              )}
            </Row>
          </Col>
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
              <h3 className="mb-2">Descritpion</h3>
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
      </Container>
    </>
  );
};

export default CourCollectif;
