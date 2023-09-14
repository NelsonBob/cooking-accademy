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
  UncontrolledCarousel,
} from "reactstrap";
import Swal from "sweetalert2";
import {
  UpdateFile,
  UploadFile,
  createMateriel,
  getFile,
  getListCategorieMateriel,
  getListMateriel,
  getMaterielById,
  readFile,
  removeFile,
  removeMaterielById,
  updateMateriel,
} from "../service/frontendService";

const Materiel = () => {
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
  const [categorieMateriel, setCategorieMateriel] = useState("");
  const [categorieMateriels, setCategorieMateriels] = useState([]);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [description, setDescription] = useState("");
  const [gallerie, setGallerie] = useState([]);
  const [gallerieUrls, setGallerieUrls] = useState([]);
  const [galleriePathLast, setGalleriePathLast] = useState([]);
  const [videoModal, setVideoModal] = useState(false);

  const [idUser, setIsUser] = useState("");
  const [errors, setErrors] = useState({});
  useEffect(() => {
    getList();
    getListCateories();
  }, []);

  useEffect(() => {}, [tableData]);
  useEffect(() => {
    if (!exampleModal)
      imgPathLast.forEach(async (el) => {
        if (el != imgPath) await removeFileUpload(el);
      });
  }, [exampleModal]);
  useEffect(() => {}, [videoModal]);

  const handleClickDesable = (id = 0, status) => {
    if (id != 0) {
      if (status != "delete") getById(id);
      setIsUser(id);
    } else {
      setName("");
      setImgPath("");
      setImgContent(null);
      setCategorieMateriel("");
      setPrice(null);
      setQuantity(null);
      setDescription("");
    }
    setTypeModal(status);
    setGallerie([]);
    setExampleModal(true);
  };
  useEffect(() => {}, [gallerie]);

  const getById = async (intern) => {
    try {
      let id = JSON.parse(localStorage.getItem("auth")).userid;
      const res = await getMaterielById(id, intern);
      let newgal = await callGal(res.gallerie);
      setGallerie(newgal);
      setName(res.name);
      setDescription(res.description);
      setCategorieMateriel(res.categorieMateriel.id);
      setQuantity(res.quantity);
      setPrice(res.price);
      setImgPath(res.imgPath);
      let contimg = await getFile(res.imgPath);
      setImgContent(contimg);
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
      const res = await getListMateriel(id);
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
  const getListCateories = async () => {
    setCategorieMateriels([]);
    try {
      let id = JSON.parse(localStorage.getItem("auth")).userid;
      const res = await getListCategorieMateriel(id);
      setCategorieMateriels(res);
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
    if (!description) {
      formIsValid = false;
      newErrors.description = "Description is required";
    }
    if (!name) {
      formIsValid = false;
      newErrors.name = "Name is required";
    }
    if (!price || parseFloat(price) <= 0) {
      formIsValid = false;
      newErrors.price = "Price must be a positive value";
    }
    if (!categorieMateriel || categorieMateriel == "") {
      formIsValid = false;
      newErrors.categorieMateriel = "Categorie Materiel is required";
    }
    if (!quantity || parseInt(quantity) <= 0) {
      formIsValid = false;
      newErrors.quantity = "Quantity must be a positive value";
    }
    if (!imgPath) {
      formIsValid = false;
      newErrors.imgPath = "Image is required";
    }
    if (gallerie && gallerie.length == 0) {
      formIsValid = false;
      newErrors.gallerie = "Gallerie is required";
    }
    if (gallerie.length > 0) {
      gallerie.forEach((el) => {
        if (!el.fileName || el.fileName == "") {
          formIsValid = false;
          newErrors.gallerie = "Gallerie is required";
          return;
        }
      });
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
      gallerie,
      categorieMateriel,
      price,
      quantity,
    };
    try {
      const user = await createMateriel(
        JSON.parse(localStorage.getItem("auth")).userid,
        data
      );
      imgPathLast.forEach(async (el) => {
        if (el != imgPath) await removeFileUpload(el);
      });
      galleriePathLast.forEach(async (el) => {
        if (el != gallerie) await removeFileUpload(el);
      });
      setImgPathLast([]);
      setGalleriePathLast([]);
      setName("");
      setDescription("");
      setImgPath("");
      setCategorieMateriel(null);
      setPrice(null);
      setQuantity(null);
      setGallerie([]);
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
      const user = await removeMaterielById(
        JSON.parse(localStorage.getItem("auth")).userid,
        idUser
      );
      setName("");
      setDescription("");
      setImgPath("");
      setCategorieMateriel(null);
      setPrice(null);
      setQuantity(null);
      setImgContent(null);
      setGallerie([]);
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
      gallerie,
      imgPath,
      categorieMateriel,
      price,
      quantity,
    };
    try {
      const user = await updateMateriel(
        JSON.parse(localStorage.getItem("auth")).userid,
        data
      );
      imgPathLast.forEach(async (el) => {
        if (el != imgPath) await removeFileUpload(el);
      });
      setName("");
      setDescription("");
      setCategorieMateriel(null);
      setPrice(null);
      setQuantity(null);
      setImgPath("");
      setImgPathLast([]);
      setImgContent(null);
      setGallerie([]);
      setExampleModal(false);
      setGalleriePathLast([]);

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
  const uploadImg = async (contentFile, typeaction, fileNa = "", index = 0) => {
    const formData = new FormData();
    formData.append("file", contentFile);
    if (contentFile)
      if (typeModal == "create") {
        try {
          if (typeaction == "image") {
            const response = await UpdateFile(imgPath, formData);
            setImgPath(response);
            let contimg = await getFile(response);
            setImgContent(contimg);
          }
          if (typeaction == "gallerie") {
            const response = await UpdateFile(fileNa, formData);
            let content = await getFile(response);
            let newgallerie = [...gallerie];
            newgallerie[index].fileName = response;
            newgallerie[index].content = content;
            setGallerie(newgallerie);
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
          tabUrl.push(response);
          if (typeaction == "image") {
            setImgPath(response);
            setImgPathLast([...imgPathLast, tabUrl]);
            let contimg = await getFile(response);
            setImgContent(contimg);
          }
          if (typeaction == "gallerie") {
            let content = await getFile(response);
            let newgallerie = [...gallerie];
            newgallerie[index].fileName = response;
            newgallerie[index].content = content;
            setGallerie(newgallerie);
            setGalleriePathLast([...galleriePathLast, response]);
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
  const handleRemoveGallerieItem = async (gal, index) => {
    const updatedGallerie = [...gallerie];
    if (gal.fileName != "") await removeFileUpload(gal.fileName);
    updatedGallerie.splice(index, 1);
    setGallerie(updatedGallerie);
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
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col md={12}>
                <h5 className="text-uppercase text-white mb-0">
                  Liste des materiels
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
                    Ajouter un materiel
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
                        <TableCell>Category</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Gallerie</TableCell>
                        <TableCell>Unit price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData && tableData.length > 0 ? (
                        tableData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.categorieMateriel.name}</TableCell>
                            <TableCell>
                              <img
                                alt="..."
                                src={imageUrls[row.id]}
                                width={50}
                                height={50}
                              />
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                              {" "}
                              <span
                                className="text-primary"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  previewGallerie(
                                    row.gallerie,
                                    row.name,
                                    row.description
                                  )
                                }
                              >
                                Voir plus
                              </span>
                            </TableCell>
                            <TableCell>{row.price}€</TableCell>
                            <TableCell>{row.quantity}</TableCell>
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
                            Aucun materiel trouvé
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
                {typeModal == "create" && "Ajouter un materiel "}
                {typeModal == "update" && "Modifier un materiel "}
                {typeModal == "delete" && "Supprimer un materiel "}
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
                      onChange={(e) => uploadImg(e.target.files[0], "image")}
                      accept="image/*"
                    />
                    {!imgPath && (
                      <>
                        {errors.imgPath && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.imgPath}
                          </span>
                        )}
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
                    {!name && (
                      <>
                        {" "}
                        {errors.name && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.name}
                          </span>
                        )}
                      </>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-free-code-camp" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Unit price"
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </InputGroup>
                    {!price && (
                      <>
                        {" "}
                        {errors.price && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.price}
                          </span>
                        )}{" "}
                      </>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-quora" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Quantity"
                        type="number"
                        step="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </InputGroup>
                    {!quantity && (
                      <>
                        {" "}
                        {errors.quantity && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.quantity}
                          </span>
                        )}{" "}
                      </>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-settings" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <select
                        className="form-control"
                        onChange={(e) => setCategorieMateriel(e.target.value)}
                        value={categorieMateriel}
                      >
                        <option value="" disabled>
                          Categorie du materiel
                        </option>
                        {categorieMateriels.map((el, i) => (
                          <option value={el.id} key={i}>
                            {el.name}
                          </option>
                        ))}
                      </select>
                    </InputGroup>
                    {!categorieMateriel && (
                      <>
                        {" "}
                        {errors.categorieMateriel && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.categorieMateriel}
                          </span>
                        )}{" "}
                      </>
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
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </InputGroup>
                    {!description && (
                      <>
                        {" "}
                        {errors.description && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.description}
                          </span>
                        )}{" "}
                      </>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <div className="d-flex text-muted align-items-center mb-2">
                      <i className="ni ni-image mr-2"></i>
                      <span className="text-muted">Gallerie</span>
                    </div>
                    {gallerie.length === 0
                      ? typeModal != "create" && <p>Loading gallerie...</p>
                      : gallerie.map((gal, index) => (
                          <div key={index}>
                            <Input
                              type="file"
                              className="btn btn-secondary"
                              onChange={(e) =>
                                uploadImg(
                                  e.target.files[0],
                                  "gallerie",
                                  gal.fileName,
                                  index
                                )
                              }
                              accept="image/*"
                            />
                            <div className="mt-2 d-flex justify-content-between">
                              {gal.content && (
                                <img
                                  alt="..."
                                  src={gal.content}
                                  width={50}
                                  height={50}
                                />
                              )}
                              <div
                                className="badge-circle mt-1 bg-danger"
                                onClick={() =>
                                  handleRemoveGallerieItem(gal, index)
                                }
                              >
                                <i
                                  className="fa fa-times"
                                  aria-hidden="true"
                                ></i>
                              </div>
                            </div>
                            <hr className="my-4" />
                          </div>
                        ))}
                    <Button
                      color="facebook"
                      type="button"
                      className="mt-2"
                      onClick={() =>
                        setGallerie([
                          ...gallerie,
                          { fileName: "", content: "" },
                        ])
                      }
                    >
                      Ajouter une photo
                    </Button>
                    {!gallerie && (
                      <>
                        {" "}
                        {errors.gallerie && (
                          <p
                            className="text-danger mt-2"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.gallerie}
                          </p>
                        )}{" "}
                      </>
                    )}
                  </FormGroup>
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
          {/* Gallerie Modal */}
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
      </Container>
    </>
  );
};
export default Materiel;
