import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardImg,
  CardText,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  Row,
} from "reactstrap";
import { checkPermissionCour, getAuthUser, getFile, getListCourActif } from "../../service/frontendService";
import Swal from "sweetalert2";

const CourClient = () => {
  const [tableData, setTableData] = useState([]);
  const [tableDataCopy, setTableDataCopy] = useState([]);
  const [inputText, setInputText] = useState("");
  const [videoModal, setVideoModal] = useState(false);
  const [name, setName] = useState("");
  const [contentCour, setContentCour] = useState("");
  const [imageUrls, setImageUrls] = useState({});
  const [typeAction, setTypeAction] = useState(null);
  const [description, setDescription] = useState(null);
  const [videoUrl, setVideoUrl] = useState({});
  const [idcour, setIdcour] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("idcour");
    getList();
  }, []);
  useEffect(() => {}, [tableData]);
  useEffect(() => {}, [typeAction]);
  useEffect(() => {}, [videoModal]);

  const handleFilter = (text) => {
    setInputText(text);
    if (text) {
      const filteredData = tableDataCopy.filter((item) => {
        return Object.values(item).some((value) => {
          if (typeof value === "string") {
            return value.toLowerCase().includes(text.toLowerCase());
          }
          return false;
        });
      });
      setTableData(filteredData);
    } else {
      setTableData(tableDataCopy);
    }
  };
  const getList = async () => {
    setTableData([]);
    setTableDataCopy([]);
    try {
      const res = await getListCourActif();
      const urls = {};
      for (const row of res) {
        const imgUrl = await getFile(row.imgPath);
        urls[row.id] = imgUrl;
      }
      setImageUrls(urls);

      if (res) {
        setTableData(res);
        setTableDataCopy(res);
      }
      setInputText("");
    } catch (error) {}
  };
  const handleClose = () => setVideoModal(!videoModal);
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

  const handleVisualiser = async () => {
    let res = await checkPermissionCour(getAuthUser().id, idcour);
    handleClose();
    if (res) {
      localStorage.setItem("idcour", idcour);
      return navigate("/in/lesson");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vous avez atteint le nombre cours quotidien, pour suivre ce cours, passer à l'offre supérieur.",
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
          window.location.href = "/in/abonnement";
        }
      });
    }
  };
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col md={12}>
                <h5 className="text-uppercase text-white mb-0">
                  Liste des cours
                </h5>
              </Col>
              <Col md={12} className=" mt-5">
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-search" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Search"
                      type="inputText"
                      onChange={(e) => handleFilter(e.target.value)}
                      value={inputText}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container className="mt--7" fluid>
        <Row className="row-grid">
          {tableData && tableData.length > 0 ? (
            tableData.map((row, index) => (
              <Col
                key={index}
                lg={6}
                style={{ cursor: "pointer" }}
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
      </Container>
    </>
  );
};
export default CourClient;
