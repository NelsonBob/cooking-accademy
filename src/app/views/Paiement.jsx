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
  assignLivreurPayment,
  confirmLivraisonPayment,
  getListLivreurs,
  getListPayment,
  readFile,
} from "../service/frontendService";

const Paiement = () => {
  const [tableData, setTableData] = useState([]);
  const [tableDataLivreur, setTableDataLivreur] = useState([]);
  const [tableDataCopy, setTableDataCopy] = useState([]);
  const [inputText, setInputText] = useState("");
  const [exampleModal, setExampleModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [items, setItems] = useState([]);
  const [note, setNote] = useState(null);
  const [amount, setAmount] = useState(0);
  const [paymentDate, setPaymentDate] = useState(null);

  const [typeModal, setTypeModal] = useState("create");
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [idUser, setIsUser] = useState("");
  const [livreur, setLivreur] = useState("");
  const [errors, setErrors] = useState({});
  const [pdfUrl, setPdfUrl] = useState({});

  useEffect(() => {
    getList();
    getListLivreur();
  }, []);

  useEffect(() => {}, [tableData]);
  useEffect(() => {}, [exampleModal]);
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};
    if (!livreur) {
      formIsValid = false;
      newErrors.livreur = "Livreur is required";
    }

    setErrors(newErrors);
    return formIsValid;
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
      const res = await getListPayment(id);

      setTableData(res);
      setTableDataCopy(res);
      setInputText("");
    } catch (error) {}
  };
  const getListLivreur = async () => {
    setTableDataLivreur([]);
    try {
      let id = JSON.parse(localStorage.getItem("auth")).userid;
      const res = await getListLivreurs(id);

      setTableDataLivreur(res);
    } catch (error) {}
  };
  const handleChangePage = (event, newpage) => {
    setpg(newpage);
  };
  const toggleModal = () => setExampleModal(!exampleModal);
  const handleChangeRowsPerPage = (event) => {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  };

  const updatTypeMethod = async () => {
    let data = {
      id: idUser,
      type: "Delivered",
    };
    try {
      const user = await confirmLivraisonPayment(
        JSON.parse(localStorage.getItem("auth")).userid,
        data
      );
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

  const updatLivreurMethod = async () => {
    let data = {
      id: idUser,
      livreur,
    };
    try {
      const user = await assignLivreurPayment(
        JSON.parse(localStorage.getItem("auth")).userid,
        data
      );

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

  const getFile = async (url) => {
    try {
      const response = await readFile(url);
      const imgUrl = URL.createObjectURL(response);
      return imgUrl;
    } catch (error) {
      toggleModal();
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error while displaying file",
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
  useEffect(() => {}, [videoModal]);
  const handleClose = () => setVideoModal(!videoModal);

  const previewColis = async (paymentDate, items, note, amount) => {
    setPaymentDate(paymentDate);
    setItems(items);
    setNote(note);
    setAmount(amount);
    setVideoModal(true);
  };
  const handleClickDesable = async (id = 0, status, info) => {
    setIsUser(id);
    setTypeModal(status);
    if (status == "recu") {
      const videoUrl = await getFile(info);
      setPdfUrl(videoUrl);
    }
    setExampleModal(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeModal == "Delivered") await updatTypeMethod();
    else {
      if (validateForm()) await updatLivreurMethod();
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
                  Liste des Payments
                </h5>
              </Col>
              <Col md={12} className="mt-5">
                <FormGroup md={6}>
                  <Button color="info" type="button" onClick={getList}>
                    <i className="fa fa-refresh" aria-hidden="true"></i>{" "}
                    Actualiser
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
                        <TableCell>Date de commande</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Tel</TableCell>
                        <TableCell>Colis</TableCell>
                        <TableCell>Livreur</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData && tableData.length > 0 ? (
                        tableData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.paymentDate}</TableCell>
                            <TableCell>{row.user.name}</TableCell>
                            <TableCell>
                              {row.numeroRue +
                                " " +
                                row.numeroRueCompl +
                                ", " +
                                row.codePostal +
                                ", " +
                                row.ville}
                            </TableCell>
                            <TableCell>{row.telephone}</TableCell>
                            <TableCell>
                              {" "}
                              <span
                                className="text-primary"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  previewColis(
                                    row.paymentDate,
                                    row.items,
                                    row.noteCommande,
                                    row.amount
                                  )
                                }
                              >
                                Voir colis
                              </span>
                            </TableCell>
                            <TableCell>
                              {row.livreur ? row.livreur.name : ""}
                            </TableCell>
                            <TableCell>
                              {row.statusCommande == "Paid" ? (
                                <span className="mr-2 text-warning">Payé</span>
                              ) : (
                                <span className="mr-2 text-success">Livré</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {!row.livreur && (
                                <Button
                                  variant="contained"
                                  color="info"
                                  onClick={() =>
                                    handleClickDesable(
                                      row.id,
                                      "assigner",
                                      row.paymentDate
                                    )
                                  }
                                >
                                  <i
                                    className="fa fa-pencil mr-2"
                                    aria-hidden="true"
                                  ></i>
                                  Assigner livreur
                                </Button>
                              )}
                              {row.livreur && row.statusCommande == "Paid" && (
                                <Button
                                  variant="contained"
                                  color="warning"
                                  onClick={() =>
                                    handleClickDesable(
                                      row.id,
                                      "Delivered",
                                      row.paymentDate
                                    )
                                  }
                                >
                                 <i
                                    className="fa fa-pencil mr-2"
                                    aria-hidden="true"
                                  ></i>
                                  Livré
                                </Button>
                              )}
                              <Button
                                variant="contained"
                                color="danger"
                                onClick={() =>
                                  handleClickDesable(
                                    row.id,
                                    "recu",
                                    row.receiptPath
                                  )
                                }
                              >
                                <i
                                  className="fa fa-ban mr-2"
                                  aria-hidden="true"
                                ></i>
                                Recu
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">
                            Aucune Payment trouvé
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
                {typeModal == "assigner" &&
                  "Assigner la commande à un livreur "}
                {typeModal == "Delivered" && "Valider la livraison "}
                {typeModal == "recu" && "Recu de paiement "}
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
              {typeModal == "assigner" && (
                <Form role="form">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-settings" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <select
                        className="form-control"
                        onChange={(e) => setLivreur(e.target.value)}
                        value={livreur}
                      >
                        <option value="" disabled>
                          Livreur
                        </option>
                        {tableDataLivreur.map((el, i) => (
                          <option value={el.id} key={i}>
                            {el.name + " | " + el.email}
                          </option>
                        ))}
                      </select>
                    </InputGroup>
                    {!livreur && (
                      <>
                        {" "}
                        {errors.livreur && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.livreur}
                          </span>
                        )}{" "}
                      </>
                    )}
                  </FormGroup>
                </Form>
              )}
              {typeModal == "Delivered" && <p>Confirmer vous cette action?</p>}
              {typeModal == "recu" && (
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    src={pdfUrl}
                    title="PDF Viewer"
                    width="100%"
                  ></iframe>
                </div>
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
              {typeModal != "recu" && (
                <Button color="primary" type="button" onClick={handleSubmit}>
                  {typeModal == "Delivered"
                    ? "Confirmer la livraison"
                    : "Assigner"}
                </Button>
              )}
            </div>
          </Modal>

          <Modal
            className="modal-dialog-centered"
            isOpen={videoModal}
            toggle={handleClose}
          >
            <div className="modal-header">
              <h5 className="modal-title">{paymentDate} </h5>
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
              {items.map((item, index) => {
                return (
                  <div key={index}>
                    <div
                      className="d-flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <div>
                        <p className="text-mutted bold">{item.name}</p>
                        <span className="text-mutted bold">
                          {item.quantity + " x €" + item.price}
                        </span>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <span>Total (tous frais compris) </span>
                <span className="bold ml-4">{"€" + amount}</span>
              </div>
              {note && (
                <>
                  <h3 className="mt-4 mb-2">Note de commande</h3>
                  <p>{note}</p>
                </>
              )}
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
export default Paiement;
