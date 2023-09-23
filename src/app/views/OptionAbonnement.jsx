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
  createOptionAbonnement,
  getListOptionAbonnement,
  getOptionAbonnementById,
  removeOptionAbonnementById,
  updateOptionAbonnement,
} from "../service/frontendService";
import { getListServiceAbonnementActif } from "../service/frontendService";

const OptionAbonnement = () => {
  const [tableData, setTableData] = useState([]);
  const [tableDataCopy, setTableDataCopy] = useState([]);
  const [inputText, setInputText] = useState("");
  const [exampleModal, setExampleModal] = useState(false);
  const [typeModal, setTypeModal] = useState("create");
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [name, setName] = useState("");
  const [service, setService] = useState([]);
  const [optionItems, setOptionItems] = useState([]);
  const [status, setStatus] = useState("");
  const [idUser, setIsUser] = useState("");
  const [errors, setErrors] = useState({});
  useEffect(() => {
    getList();
    getListServiceAbbActif();
  }, []);

  useEffect(() => {}, [tableData]);
  useEffect(() => {}, [service]);

  useEffect(() => {}, [exampleModal, optionItems]);

  const handleClickDesable = (id = 0, status) => {
    if (id != 0) {
      if (status != "delete") getById(id);
      setIsUser(id);
      setExampleModal(true);
    } else {
      addOptionItem(service);
      setName("");
      setStatus("");
      setExampleModal(true);
    }
    setTypeModal(status);
  };
  const getById = async (intern) => {
    setOptionItems([]);
    try {
      let id = JSON.parse(localStorage.getItem("auth"))?.userid;
      const res = await getOptionAbonnementById(id, intern);
      setName(res.name);
      const newOptionItems = res.optionServiceAbonnement.map((el) => ({
        description: el.description,
        descriptionvalue: el.descriptionvalue,
        icon: el.icon,
        id: el.id,
        isValueicon: el.isValueicon,
        serviceAbonnement: el.serviceAbonnement.id,
        serviceAbonnementName: el.serviceAbonnement.name,
      }));

      setOptionItems(newOptionItems);
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
      let id = JSON.parse(localStorage.getItem("auth"))?.userid;
      const res = await getListOptionAbonnement(id);
      if (res) {
        setTableData(res);
        setTableDataCopy(res);
      }
      setInputText("");
    } catch (error) {}
  };
  const getListServiceAbbActif = async () => {
    setService([]);
    try {
      let id = JSON.parse(localStorage.getItem("auth"))?.userid;
      const res = await getListServiceAbonnementActif(id);
      setService(res);
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
    if (!name) {
      formIsValid = false;
      newErrors.name = "Name is required";
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
  const addOptionItem = (serv) => {
    setOptionItems([]);
    const newOptionItems = serv.map((el) => ({
      description: true,
      descriptionvalue: "",
      icon: true,
      isValueicon: true,
      serviceAbonnement: el.id,
      serviceAbonnementName: el.name,
    }));

    setOptionItems(newOptionItems);
  };
  const creatMethod = async () => {
    let data = {
      name,
      optionServiceAbonnementRequests: optionItems,
    };
    try {
      const user = await createOptionAbonnement(
        JSON.parse(localStorage.getItem("auth"))?.userid,
        data
      );
      setName("");
      setOptionItems([]);
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
      const user = await removeOptionAbonnementById(
        JSON.parse(localStorage.getItem("auth"))?.userid,
        idUser
      );
      setName("");
      setOptionItems([]);
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
      optionServiceAbonnementRequests: optionItems,
      status,
    };
    try {
      const user = await updateOptionAbonnement(
        JSON.parse(localStorage.getItem("auth"))?.userid,
        data
      );
      setName("");
      setOptionItems([]);
      setStatus("");
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
  const handleDescriptionChange = (index) => {
    const updatedOptionItems = [...optionItems];
    updatedOptionItems[index].description =
      !updatedOptionItems[index].description;
    setOptionItems(updatedOptionItems);
  };
  const handleIconChange = (index) => {
    const updatedOptionItems = [...optionItems];
    updatedOptionItems[index].icon = !updatedOptionItems[index].icon;
    setOptionItems(updatedOptionItems);
  };
  const handleIsValueIconChange = (index) => {
    const updatedOptionItems = [...optionItems];
    updatedOptionItems[index].isValueicon =
      !updatedOptionItems[index].isValueicon;
    setOptionItems(updatedOptionItems);
  };
  const handleDescriptionValueChange = (index, value) => {
    const updatedOptionItems = [...optionItems];
    updatedOptionItems[index].descriptionvalue = value;
    setOptionItems(updatedOptionItems);
  };
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col md={12}>
                <h5 className="text-uppercase text-white mb-0">
                  Liste des options abonnements
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
                    Ajouter une option abonnement
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
                        <TableCell>Name</TableCell>
                        <TableCell>Detail</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData && tableData.length > 0 ? (
                        tableData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                              {row.optionServiceAbonnement.map((el, index) => (
                                <ol
                                  className="list-group list-group-numbered"
                                  key={el.id}
                                >
                                  <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto" style={{display:"grid"}}>
                                      <div>
                                        {index +
                                          1 +
                                          "- " +
                                          el.serviceAbonnement.name}
                                      </div>

                                      {el.icon ? (
                                        el.isValueicon ? (
                                          <span className="text-success">
                                            {" "}
                                            Béneficie{" "}
                                          </span>
                                        ) : (
                                          <span className="text-danger">
                                            Ne béneficie pas{" "}
                                          </span>
                                        )
                                      ) : (
                                        ""
                                      )}
                                      {el.description && (
                                        <span>{el.descriptionvalue}</span>
                                      )}
                                    </div>
                                  </li>
                                </ol>
                              ))}
                            </TableCell>
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
                            Aucune option abonnement trouvé
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
                {typeModal == "create" && "Ajouter une option abonnement "}
                {typeModal == "update" && "Modifier une option abonnement "}
                {typeModal == "delete" && "Supprimer une option abonnement "}
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
                  {optionItems.map((item, index) => (
                    <div key={index}>
                      <h3>
                        {index + 1}
                        {"- "} {item.serviceAbonnementName}
                      </h3>
                      <FormGroup className="mb-0">
                        <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            checked={item.icon}
                            id={"f1" + index}
                            onChange={() => handleIconChange(index)}
                          />
                          <label
                            className="form-check-label"
                            for={"f1" + index}
                          >
                            Y a t'il une icone?
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <div className="form-check ml-4">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            checked={item.isValueicon}
                            id={"f4" + index}
                            onChange={() => handleIsValueIconChange(index)}
                          />
                          <label
                            className="form-check-label"
                            for={"f4" + index}
                          >
                            Valeur de l'icone
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup className="mb-0">
                        <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            checked={item.description}
                            id={"f2" + index}
                            onChange={() => handleDescriptionChange(index)}
                          />
                          <label
                            className="form-check-label"
                            for={"f2" + index}
                          >
                            Y a t'il une description?
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3 ml-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-hat-3" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Valeur de la description"
                            type="text"
                            value={item.descriptionvalue}
                            onChange={(e) =>
                              handleDescriptionValueChange(
                                index,
                                e.target.value
                              )
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                    </div>
                  ))}
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
export default OptionAbonnement;
