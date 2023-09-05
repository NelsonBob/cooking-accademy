import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { getSalleById, readFile } from "../../service/frontendService";

const Reservation = () => {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState({});
  const [imageUrls, setImageUrls] = useState([]);
  const idSalle = localStorage.getItem("idSalle");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getSalle();
  }, []);
  const openModal = (imag) => {
    setSelectedImage(imag);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };
  const getSalle = async () => {
    try {
      const res = await getSalleById(idSalle);
      let newgal = await callGal(res.gallerie);
      setImageUrls(newgal);
      setTableData(res);
    } catch (error) {}
  };
  const callGal = (galleries) => {
    let res = [];
    galleries.forEach(async (el) => {
      let el1 = await getFile(el);
      res.push({ fileName: el, content: el1 });
    });
    return res;
  };
  const getFile = async (url) => {
    try {
      const response = await readFile(url);
      const imgUrl = URL.createObjectURL(response);
      return imgUrl;
    } catch (error) {
      console.error("Error displaying file:", error);
    }
  };
  if (!idSalle) return navigate("/out/location");
  else
    return (
      <>
        <div className="header bg-info py-7 py-lg-8">
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        <Container className="mt--8 pb-5 position-relative">
          <Row>
            {!tableData ? (
              <Col md={12} className="my-4 d-flex justify-content-center">
                <div className="spinner-grow text-warning" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </Col>
            ) : (
              <>
                <Col md={6} className="my-4">
                  <h1 className="text-white">{tableData.name}</h1>
                  <p>
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                    {tableData.adress}
                  </p>
                </Col>
                <Col
                  md={6}
                  className="my-4 d-flex justify-content-end align-items-baseline"
                >
                  <Button color="primary">Réserver maintenant</Button>{" "}
                </Col>
                <Col md={12}>
                  <Row>
                    {imageUrls.map((imag, index) => (
                      <Col key={index} xs={6} md={4} lg={3}>
                        <img
                          src={imag}
                          alt="..."
                          onClick={() => openModal(imag)}
                          style={{ cursor: "pointer" }}
                        />
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col md={12}>
                  <h2>Description</h2>
                  <p>{tableData.description}</p>
                </Col>
              </>
            )}
          </Row>
          <Modal isOpen={modalOpen} toggle={closeModal}>
            <ModalHeader toggle={closeModal}>Image Preview</ModalHeader>
            <ModalBody>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="..."
                  style={{ maxWidth: "100%" }}
                />
              )}
            </ModalBody>
            <Button color="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal>
        </Container>
      </>
    );
};

export default Reservation;
