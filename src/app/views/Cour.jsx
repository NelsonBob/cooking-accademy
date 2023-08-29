import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  Row,
  Table,
} from "reactstrap";
import Swal from "sweetalert2";
import {
  UpdateFile,
  UploadFile,
  createCour,
  getCourById,
  getListCour,
  readFile,
  removeCourById,
  removeFile,
  updateCour,
} from "../service/frontendService";

const Cour = () => {
  const [tableData, setTableData] = useState([]);
  const [tableDataCopy, setTableDataCopy] = useState([]);
  const [inputText, setInputText] = useState("");
  const [exampleModal, setExampleModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [typeModal, setTypeModal] = useState("create");
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);

  const [name, setName] = useState("");
  const [contentCour, setContentCour] = useState("");
  const [description, setDescription] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [isVideoLocal, setIsVideoLocal] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [imgPathLast, setImgPathLast] = useState([]);
  const [imgContent, setImgContent] = useState(null);
  const [imageUrls, setImageUrls] = useState({});
  const [videoPathLast, setVideoPathLast] = useState([]);
  const [videoContent, setVideoContent] = useState(null);
  const [videoUrl, setVideoUrl] = useState({});
  const [status, setStatus] = useState(false);

  const [idUser, setIsUser] = useState("");
  const [errors, setErrors] = useState({});
  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {}, [tableData]);
  useEffect(() => {}, [videoModal]);
  useEffect(() => {}, [exampleModal]);

  const handleClickDesable = (id = 0, status) => {
    if (id != 0) {
      if (status != "delete") getById(id);
      setIsUser(id);
      setExampleModal(true);
    } else {
      setName("");
      setImgPath("");
      setImgContent(null);
      setVideoContent(null);
      setContentCour("");
      setDescription("");
      setVideoLink("");
      setIsVideoLocal(false);
      setStatus(false);

      setExampleModal(true);
    }
    setTypeModal(status);
  };
  const getById = async (intern) => {
    try {
      let id = JSON.parse(localStorage.getItem("auth")).userid;
      const res = await getCourById(id, intern);
      setName(res.name);
      setDescription(res.description);
      setImgPath(res.imgPath);
      setIsVideoLocal(res.isVideoLocal);
      setStatus(res.status);
      setContentCour(res.contentCour);
      setVideoLink(res.videoLink);
      let imgfile = await getFile(res.imgPath);
      let videofile = await getFile(res.videoLink);
      setImgContent(imgfile);
      setVideoContent(videofile);
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
      let id = JSON.parse(localStorage.getItem("auth")).userid;
      const res = await getListCour(id);
      const urls = {};
      const urlVideos = {};
      for (const row of res) {
        const imgUrl = await getFile(row.imgPath);
        urls[row.id] = imgUrl;
      }
      setImageUrls(urls);

      setTableData(res);
      setTableDataCopy(res);
      setInputText("");
    } catch (error) {}
  };
  const handleChangePage = (event, newpage) => {
    setpg(newpage);
  };
  const toggleModal = () => setExampleModal(!exampleModal);
  const handleClose = () => setVideoModal(!videoModal);
  const handleChangeRowsPerPage = (event) => {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  };
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!name) {
      formIsValid = false;
      newErrors.name = "Name is required";
    }

    if (!contentCour) {
      formIsValid = false;
      newErrors.contentCour = "Content cour is required";
    }

    if (!description) {
      formIsValid = false;
      newErrors.description = "Description is required";
    }
    if (!imgPath) {
      formIsValid = false;
      newErrors.imgPath = "Image Header is required";
    }

    if (!videoLink) {
      formIsValid = false;
      newErrors.videoLink = "Video Link is required";
    }
    setErrors(newErrors);
    return formIsValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeModal == "delete") await removMethod();
    else {
      if (validateForm()) {
        if (typeModal == "create") await creatMethod();
        else await updatMethod();
      }
    }
  };
  const creatMethod = async () => {
    let data = {
      name,
      contentCour,
      description,
      imgPath,
      isVideoLocal,
      videoLink,
    };
    try {
      const user = await createCour(
        JSON.parse(localStorage.getItem("auth")).userid,
        data
      );
      imgPathLast.forEach(async (el) => {
        if (el != imgPath) await removeFileUpload(el);
      });
      videoPathLast.forEach(async (el) => {
        if (el != imgPath) await removeFileUpload(el);
      });
      setImgPathLast([]);
      setVideoPathLast([]);
      setName("");
      setImgPath("");
      setImgContent(null);
      setVideoContent(null);
      setContentCour("");
      setDescription("");
      setVideoLink("");
      setIsVideoLocal(false);
      setImgContent(null);
      setVideoContent(null);
      setStatus(false);

      setExampleModal(false);
      getList();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Ajouté avec succès",
        showConfirmButton: false,
        timer: 1500,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } catch (error) {}
  };
  const removMethod = async () => {
    try {
      const user = await removeCourById(
        JSON.parse(localStorage.getItem("auth")).userid,
        idUser
      );
      setName("");
      setImgPath("");
      setImgContent(null);
      setVideoContent(null);
      setContentCour("");
      setDescription("");
      setVideoLink("");
      setIsVideoLocal(false);
      setImgContent(null);
      setVideoContent(null);

      setExampleModal(false);
      getList();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Suppression effectué avec succès",
        showConfirmButton: false,
        timer: 1500,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } catch (error) {}
  };
  const updatMethod = async () => {
    let data = {
      id: idUser,
      name,
      contentCour,
      description,
      imgPath,
      isVideoLocal,
      videoLink,
      status,
    };
    try {
      const user = await updateCour(
        JSON.parse(localStorage.getItem("auth")).userid,
        data
      );
      setImgPathLast([]);
      setVideoPathLast([]);
      setName("");
      setImgPath("");
      setImgContent(null);
      setVideoContent(null);
      setContentCour("");
      setDescription("");
      setVideoLink("");
      setIsVideoLocal(false);
      setImgContent(null);
      setVideoContent(null);
      setStatus(false);
      setExampleModal(false);
      getList();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Mise à jour avec succès",
        showConfirmButton: false,
        timer: 1500,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } catch (error) {}
  };
  const removeFileUpload = async (img) => {
    try {
      const response = await removeFile(img);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error uploading file",
        showConfirmButton: false,
        timer: 2000,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  };
  const uploadImg = async (contentFile, typeAction) => {
    const formData = new FormData();
    formData.append("file", contentFile);
    if (typeModal == "create") {
      try {
        const response = await UpdateFile(
          typeAction == "image" ? imgPath : videoLink,
          formData
        );
        if (typeAction == "image") {
          setImgPath(response);
          let imgUrl = await getFile(response);
          setImgContent(imgUrl);
        }
        if (typeAction == "video") {
          setVideoLink(response);
          let videoUrl = await getFile(response);
          setVideoContent(videoUrl);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error uploading file",
          showConfirmButton: false,
          timer: 2000,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
    } else
      try {
        let tabUrl = [];
        const response = await UploadFile(formData);
        if (typeAction == "image") {
          tabUrl.push(response);
          setImgPath(response);
          setImgPathLast([...imgPathLast, tabUrl]);
          let imgUrl = await getFile(response);
          setImgContent(imgUrl);
        }
        if (typeAction == "video") {
          tabUrl.push(response);
          setVideoLink(response);
          setVideoPathLast([...videoPathLast, tabUrl]);
          let videoUrl = await getFile(response);
          setVideoContent(videoUrl);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error uploading file",
          showConfirmButton: false,
          timer: 2000,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
  };
  const previewVideo = async (video, title, content) => {
    const videoUrl = await getFile(video);
    setVideoUrl(videoUrl);
    setName(title);
    setContentCour(content);
    setVideoModal(true);
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
              <Col md={12} className="d-flex justify-content-between mt-5">
                <FormGroup md={6}>
                  <Button color="info" type="button" onClick={getList}>
                    <i className="fa fa-refresh" aria-hidden="true"></i>{" "}
                    Actualiser
                  </Button>
                </FormGroup>
                <FormGroup md={6}>
                  <Button
                    color="success"
                    type="button"
                    onClick={() => handleClickDesable(0, "create")}
                  >
                    <i className="fa fa-plus-circle" aria-hidden="true"></i>{" "}
                    Ajouter un cour
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
                <Form role="form">
                  <FormGroup className="mb-3">
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
                </Form>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Video</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Descritpion</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData && tableData.length > 0 ? (
                        tableData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>
                              <img
                                alt="..."
                                src={imageUrls[row.id]}
                                width={50}
                                height={50}
                              />
                            </TableCell>
                            <TableCell>
                              {row.isVideoLocal ? (
                                <span
                                  className="text-primary"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    previewVideo(
                                      row.videoLink,
                                      row.name,
                                      row.contentCour
                                    )
                                  }
                                >
                                  {row.videoLink}
                                </span>
                              ) : (
                                <a
                                  href={row.videoLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {row.videoLink}
                                </a>
                              )}
                            </TableCell>
                            <TableCell className="truncated-cell">
                              {row.name}
                            </TableCell>
                            <TableCell className="truncated-cell">
                              {row.description}
                            </TableCell>

                            <TableCell>
                              <Button
                                variant="contained"
                                color="warning"
                                onClick={() =>
                                  handleClickDesable(row.id, "update")
                                }
                              >
                                <i
                                  className="fa fa-pencil mr-2"
                                  aria-hidden="true"
                                ></i>
                                Modifier
                              </Button>
                              <Button
                                variant="contained"
                                color="danger"
                                onClick={() =>
                                  handleClickDesable(row.id, "delete")
                                }
                              >
                                <i
                                  className="fa fa-ban mr-2"
                                  aria-hidden="true"
                                ></i>
                                Supprimer
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">
                            Aucune categorie materielle trouvé
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={tableData.length}
                  rowsPerPage={rpg}
                  page={pg}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </CardBody>
            </Card>
          </Col>
          {/* Modal */}
          <Modal
            className="modal-dialog-centered"
            isOpen={exampleModal}
            toggle={toggleModal}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {typeModal == "create" && "Ajouter un cour "}
                {typeModal == "update" && "Modifier un cour "}
                {typeModal == "delete" && "Supprimer un cour "}
              </h5>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={toggleModal}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              {typeModal != "delete" ? (
                <Form role="form">
                  <FormGroup>
                    <div className="d-flex text-muted align-items-center">
                      <i className="ni ni-image mr-2"></i>
                      <span className="text-muted">Image d'acceuil</span>
                    </div>
                    <Input
                      type="file"
                      onChange={(e) => uploadImg(e.target.files[0], "image")}
                      accept="image/*"
                    />
                    {errors.imgPath && (
                      <span
                        className="text-danger"
                        style={{ fontSize: "13px" }}
                      >
                        {errors.imgPath}
                      </span>
                    )}
                    {imgContent && (
                      <img alt="..." src={imgContent} width={50} height={50} />
                    )}
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </InputGroup>
                    {errors.name && (
                      <span
                        className="text-danger"
                        style={{ fontSize: "13px" }}
                      >
                        {errors.name}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-list-ul" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </InputGroup>
                    {errors.description && (
                      <span
                        className="text-danger"
                        style={{ fontSize: "13px" }}
                      >
                        {errors.description}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-list-ul" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Objectif et Chapitre"
                        type="textarea"
                        value={contentCour}
                        onChange={(e) => setContentCour(e.target.value)}
                      />
                    </InputGroup>
                    {errors.description && (
                      <span
                        className="text-danger"
                        style={{ fontSize: "13px" }}
                      >
                        {errors.contentCour}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <div className="form-check">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault1"
                        checked={isVideoLocal == true}
                        value={isVideoLocal}
                        onChange={(e) =>
                          setIsVideoLocal(e.target.checked ? true : false)
                        }
                      />
                      <label
                        className="form-check-label"
                        for="flexCheckDefault1"
                      >
                        Le cour est une video?
                      </label>
                    </div>
                  </FormGroup>
                  {!isVideoLocal ? (
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-list-ul" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Url de la video"
                          type="url"
                          value={videoLink}
                          onChange={(e) => setVideoLink(e.target.value)}
                        />
                      </InputGroup>
                      {errors.videoLink && (
                        <span
                          className="text-danger"
                          style={{ fontSize: "13px" }}
                        >
                          {errors.videoLink}
                        </span>
                      )}
                    </FormGroup>
                  ) : (
                    <FormGroup>
                      <div className="d-flex text-muted align-items-center">
                        <i className="ni ni-image mr-2"></i>
                        <span className="text-muted">Charger votre video</span>
                      </div>
                      <Input
                        type="file"
                        onChange={(e) => uploadImg(e.target.files[0], "video")}
                        accept="video/*"
                      />
                      {errors.videoLink && (
                        <span
                          className="text-danger"
                          style={{ fontSize: "13px" }}
                        >
                          {errors.videoLink}
                        </span>
                      )}
                      {videoContent && (
                        <div
                          className="embed-responsive embed-responsive-16by9"
                          style={{ width: "80px", height: "80px" }}
                        >
                          <iframe
                            className="embed-responsive-item"
                            src={videoContent}
                            title="Video"
                          ></iframe>
                        </div>
                      )}
                    </FormGroup>
                  )}
                  {typeModal == "update" && (
                    <FormGroup>
                      <div className="form-check">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                          checked={status == true}
                          value={status}
                          onChange={(e) =>
                            setStatus(e.target.checked ? true : false)
                          }
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Status
                        </label>
                      </div>
                    </FormGroup>
                  )}
                </Form>
              ) : (
                <p>Confirmer vous cette action?</p>
              )}
            </div>
            <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={toggleModal}
              >
                Close
              </Button>
              <Button color="primary" type="button" onClick={handleSubmit}>
                {typeModal != "delete" ? " Save changes" : "Confirmer"}
              </Button>
            </div>
          </Modal>

          {/* Video Modal */}
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
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  className="embed-responsive-item"
                  src={videoUrl}
                  title="Video"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="mt-4 mb-2">Contenu</h3>
              <p>{contentCour}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
            </div>
          </Modal>
        </Row>
      </Container>
    </>
  );
};
export default Cour;
