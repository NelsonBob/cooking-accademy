import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Modal,
  Row,
  UncontrolledCarousel,
} from "reactstrap";
import { getListMaterielActif, readFile } from "../../service/frontendService";

function Boutique() {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [gallerieUrls, setGallerieUrls] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoModal, setVideoModal] = useState(false);

  useEffect(() => {
    getList();
  }, []);
  useEffect(() => {}, [videoModal]);
  const handleClose = () => setVideoModal(!videoModal);

  const getList = async () => {
    setTableData([]);
    try {
      const res = await getListMaterielActif();
      const urls = {};
      for (const row of res) {
        const imgUrl = await getFile(row.imgPath);
        urls[row.id] = imgUrl;
      }
      setImageUrls(urls);
      setTableData(res);
    } catch (error) {}
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
  const previewGallerie = async (galle = [], title, content) => {
    let lienurl = [];
    galle.forEach(async (el, index) => {
      const elUrl = await getFile(el);
      lienurl.push({ src: elUrl, key: index, caption: "" });
    });
    setGallerieUrls(lienurl);
    setName(title);
    setDescription(content);
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
            <h1 className="text-white text-center">{t("Market.title")}</h1>
          </Col>
          <Col md={12} className="mt-5">
            <Row className="row-grid">
              {tableData && tableData.length > 0 ? (
                tableData.map((row, i) => (
                  <Col lg={4} key={i}>
                    <Card>
                      <CardImg
                        alt="..."
                        src={imageUrls[row.id]}
                        top
                        height={300}
                        className="centered-and-covered-img "
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          previewGallerie(
                            row.gallerie,
                            row.name,
                            row.description
                          )
                        }
                      />
                      <div className="p-3">
                        <CardTitle>
                          <h3 className="bold">{row.name}</h3>
                        </CardTitle>
                        <CardText className="color-footer">
                          €{row.price}
                        </CardText>
                        <button
                          className="btn btn-primary btn-block"
                          type="button"
                        >
                          Commander
                        </button>
                      </div>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col lg={12}>
                  <h2 className="text-center">Aucun materiel trouvé</h2>
                </Col>
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
                  <div className="image-container">
                    <UncontrolledCarousel items={gallerieUrls} />
                  </div>
                  <h3 className="mt-4 mb-2">Descritpion</h3>
                  <p>{description}</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={handleClose}>
                    Close
                  </button>
                </div>
              </Modal>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Boutique;
