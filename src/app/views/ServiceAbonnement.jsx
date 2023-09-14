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
  createServiceAbonnement,
  getFile,
  getListServiceAbonnement,
  getServiceAbonnementById,
  removeFile,
  removeServiceAbonnementById,
  updateServiceAbonnement
} from "../service/frontendService";

const ServiceAbonnement = () => {
  const [tableData, setTableData] = useState([]);
  const [tableDataCopy, setTableDataCopy] = useState([]);
  const [inputText, setInputText] = useState("");
  const [exampleModal, setExampleModal] = useState(false);
  const [typeModal, setTypeModal] = useState("create");
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [imgPath, setImgPath] = useState(null);
  const [imgPathLast, setImgPathLast] = useState([]);
  const [imgContent, setImgContent] = useState(null);
  const [imageUrls, setImageUrls] = useState({});

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [idUser, setIsUser] = useState("");
  const [errors, setErrors] = useState({});
  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {}, [tableData]);

  useEffect(() => {
    if (!exampleModal)
      imgPathLast.forEach(async (el) => {
        if (el != imgPath) await removeFileUpload(el);
      });
  }, [exampleModal]);

  const handleClickDesable = (id = 0, status) => {
    if (id != 0) {
      if (status != "delete") getById(id);
      setIsUser(id);
      setExampleModal(true);
    } else {
      setName("");
      setImgPath("");
      setImgContent(null);
      setDescription("");
      setStatus("");
      setExampleModal(true);
    }
    setTypeModal(status);
  };
  const getById = async (intern) => {
    try {
      let id = JSON.parse(localStorage.getItem("auth")).userid;
      const res = await getServiceAbonnementById(id, intern);
      setName(res.name);
      setDescription(res.description);
      setImgPath(res.imgPath);
      let imgUl = await getFile(res.imgPath);
      setImgContent(imgUl);
      setStatus(res.status);
    } catch (error) {}
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
      const res = await getListServiceAbonnement(id);
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
  const handleChangePage = (event, newpage) => {
    setpg(newpage);
  };
  const toggleModal = () => {
    setExampleModal(!exampleModal);
  };
  const handleChangeRowsPerPage = (event) => {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  };
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};
    if (!description) {
      formIsValid = false;
      newErrors.description = "Description is required";
    }
    if (!name) {
      formIsValid = false;
      newErrors.name = "Name is required";
    }
    if (!imgPath) {
      formIsValid = false;
      newErrors.name = "Image is required";
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
      description,
      imgPath,
    };
    try {
      const user = await createServiceAbonnement(
        JSON.parse(localStorage.getItem("auth")).userid,
        data
      );
      imgPathLast.forEach(async (el) => {
        if (el != imgPath) await removeFileUpload(el);
      });
      setImgPathLast([]);
      setName("");
      setDescription("");
      setImgPath("");
      setImgContent(null);
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
      const user = await removeServiceAbonnementById(
        JSON.parse(localStorage.getItem("auth")).userid,
        idUser
      );
      setName("");
      setDescription("");
      setImgPath("");
      setImgContent(null);
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
      description,
      imgPath,
      status,
    };
    try {
      const user = await updateServiceAbonnement(
        JSON.parse(localStorage.getItem("auth")).userid,
        data
      );
      imgPathLast.forEach(async (el) => {
        if (el != imgPath) await removeFileUpload(el);
      });
      setName("");
      setDescription("");
      setStatus("");
      setImgPath("");
      setImgPathLast([]);
      setImgContent(null);
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
  const uploadImg = async (contentFile) => {
    const formData = new FormData();
    formData.append("file", contentFile);
    if (contentFile)
      if (typeModal == "create") {
        try {
          const response = await UpdateFile(imgPath, formData);
          setImgPath(response);
          let imgUl = await getFile(response);
          setImgContent(imgUl);
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
          tabUrl.push(response);
          setImgPath(response);
          setImgPathLast([...imgPathLast, tabUrl]);
          let imgUl = await getFile(response);
          setImgContent(imgUl);
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

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col md={12}>
                <h5 className="text-uppercase text-white mb-0">
                  Liste des services abonnements
                </h5>
              </Col>
              <Col md={12} className="d-md-flex justify-content-between mt-5">
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
                    Ajouter un service abonnement
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
                        <TableCell>Name</TableCell>
                        <TableCell>Descritpion</TableCell>
                        <TableCell>Status</TableCell>
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
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>
                              {row.status ? (
                                <i
                                  className="fa fa-map-pin mr-2 text-success"
                                  aria-hidden="true"
                                ></i>
                              ) : (
                                <i
                                  className="fa fa-map-pin mr-2"
                                  aria-hidden="true"
                                ></i>
                              )}
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
                            Aucun service abonnement trouvé
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
                {typeModal == "create" && "Ajouter un service abonnement "}
                {typeModal == "update" && "Modifier un service abonnement "}
                {typeModal == "delete" && "Supprimer un service abonnement "}
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
                      <span className="text-muted">Image</span>
                    </div>
                    <Input
                      type="file"
                      className="btn btn-secondary"
                      onChange={(e) => uploadImg(e.target.files[0])}
                      accept="image/*"
                    />
                    {!imgPath && (
                      <>
                        {" "}
                        {errors.imgPath && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.imgPath}
                          </span>
                        )}{" "}
                      </>
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
                          htmlFor="flexCheckDefault"
                        >
                          Status
                        </label>
                      </div>

                      {errors.status && (
                        <span
                          className="text-danger"
                          style={{ fontSize: "13px" }}
                        >
                          {errors.status}
                        </span>
                      )}
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
        </Row>
      </Container>
    </>
  );
};
export default ServiceAbonnement;
