import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Rating } from "react-simple-star-rating";
import { useCart } from "react-use-cart";
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
import {
  getAuthUser,
  getFile,
  getListMaterielActif,
} from "../../service/frontendService";
import Swal from "sweetalert2";

function Boutique() {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [gallerieUrls, setGallerieUrls] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoModal, setVideoModal] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    getList();
  }, []);
  useEffect(() => {}, [videoModal]);
  const handleClose = () => setVideoModal(!videoModal);

  const getList = async () => {
    setTableData([]);
    try {
      const res = await getListMaterielActif();
      const tab = [];

      for (const row of res) {
        const imgUrl = await getFile(row.imgPath);
        tab.push({
          gallerie: row.gallerie,
          id: row.id,
          name: row.name,
          description: row.description,
          price: row.price,
          imgUrl,
          type: "Materiel",
          avis: row.avis,
        });
      }
      setTableData(tab);
    } catch (error) {}
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
  const handleAddToCart = (row) => {
    if (
      getAuthUser().role != "Client" ||
      (getAuthUser().role == "Client" &&
        !getAuthUser()?.subscription?.name.includes("Free"))
    )
      addItem(row);
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Veuillez mettre à jour niveau votre abonnement pour effectuer l'action",
        confirmButtonText: "Mettre à niveau",
        showCancelButton: true,
        cancelButtonText: "Annulé",
        cancelButtonColor: "#d33",

        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          if (localStorage.getItem("auth") != null)
            window.location.href = "/in/abonnement";
          else window.location.href = "/out/register";
        }
      });
    }
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
                        src={row.imgUrl}
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
                        {row.avis > 0 && (
                          <span className="text-center">
                            <Rating
                              initialValue={row.avis}
                              readonly
                              size={17}
                            />
                          </span>
                        )}
                        <CardText className="color-footer">
                          €{row.price}
                        </CardText>
                        <button
                          className="btn btn-primary btn-block"
                          type="button"
                          onClick={() => handleAddToCart(row)}
                        >
                          Ajouter au panier
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
