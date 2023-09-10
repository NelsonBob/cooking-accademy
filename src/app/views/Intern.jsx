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
  createIntern,
  getInternById,
  getListIntern,
  updateIntern,
} from "../service/frontendService";

const Intern = () => {
  const [tableData, setTableData] = useState([]);
  const [tableDataCopy, setTableDataCopy] = useState([]);
  const [inputText, setInputText] = useState("");
  const [idUser, setIsUser] = useState("");
  const [exampleModal, setExampleModal] = useState(false);
  const [typeModal, setTypeModal] = useState("create");
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fonction, setFonction] = useState("");
  const [role, setRole] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    setTableData([]);
    setTableDataCopy([]);
    try {
      let id = JSON.parse(localStorage.getItem("auth")).userid;
      const res = await getListIntern(id);
      if (res) {
        setTableData(res);
        setTableDataCopy(res);
      }
      setInputText("");
    } catch (error) {}
  };

  useEffect(() => {}, [tableData]);

  useEffect(() => {}, [exampleModal]);

  const handleClickDesable = (id = 0, status) => {
    if (id != 0) {
      getById(id);
      setIsUser(id);
      setExampleModal(true);
    } else {
      setName("");
      setEmail("");
      setPassword("");
      setFonction("");
      setRole("");
      setPasswordConfirm("");
      setExampleModal(true);
    }
    setTypeModal(status);
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
  const getById = async (intern) => {
    try {
      let id = JSON.parse(localStorage.getItem("auth")).userid;
      const res = await getInternById(id, intern);
      setName(res.name);
      setEmail(res.email);
      setRole(res.role);
      setFonction(res.fonction);
    } catch (error) {}
  };
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};
    if (!email) {
      formIsValid = false;
      newErrors.email = "Email is required";
    }

    if (!fonction) {
      formIsValid = false;
      newErrors.fonction = "Fonction is required";
    }
    if (!role) {
      formIsValid = false;
      newErrors.role = "Role is required";
    }
    if (!name) {
      formIsValid = false;
      newErrors.name = "Name is required";
    }
    if (typeModal == "create") {
      if (password && password !== password_confirm) {
        formIsValid = false;
        newErrors.password = "Password must match with confirm password";
      }
      if (!password) {
        formIsValid = false;
        newErrors.password = "Password is required";
      }
    }
    setErrors(newErrors);
    return formIsValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (typeModal == "create") await creatIntern();
      else await updatIntern();
    }
  };
  const creatIntern = async () => {
    let data = {
      name,
      email,
      password,
      role,
      fonction,
    };
    try {
      const user = await createIntern(
        JSON.parse(localStorage.getItem("auth")).userid,
        data
      );
      setName("");
      setEmail("");
      setPassword("");
      setFonction("");
      setRole("");
      setPasswordConfirm("");
      setExampleModal(false);
      getList();

      if (user) {
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
      }
    } catch (error) {}
  };
  const updatIntern = async () => {
    let data = {
      id: idUser,
      name,
      email,
      role,
      fonction,
    };
    try {
      const user = await updateIntern(
        JSON.parse(localStorage.getItem("auth")).userid,
        data
      );
      setName("");
      setEmail("");
      setFonction("");
      setRole("");
      setExampleModal(false);
      getList();

      if (user) {
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
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col md={12}>
                <h5 className="text-uppercase text-white mb-0">
                  Liste des interns
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
                    Ajouter un intern
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
                        <TableCell>Email</TableCell>
                        <TableCell>Fonction</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData && tableData.length > 0 ? (
                        tableData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.fonction}</TableCell>
                            <TableCell>{row.role}</TableCell>
                            <TableCell>
                              {JSON.parse(localStorage.getItem("auth"))
                                .userid != row.id && (
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
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">
                            Aucun intern trouvé
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
                {typeModal == "create"
                  ? "Ajouter un intern "
                  : "update" && "Modifier un intern "}
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
                    <span className="text-danger" style={{ fontSize: "13px" }}>
                      {errors.name}
                    </span>
                  )}
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-bus-front-12" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Fonction"
                      type="text"
                      value={fonction}
                      onChange={(e) => setFonction(e.target.value)}
                    />
                  </InputGroup>
                  {errors.fonction && (
                    <span className="text-danger" style={{ fontSize: "13px" }}>
                      {errors.fonction}
                    </span>
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
                      onChange={(e) => setRole(e.target.value)}
                      value={role}
                    >
                      <option value="" disabled>
                        Role
                      </option>
                      <option value="Admin">Admin</option>
                      <option value="Gestionnaire">Gestionnaire</option>
                      <option value="Livreur">Livreur</option>
                      <option value="Formateur">Formateur</option>{" "}
                      <option value="Chefs">Chefs</option>
                    </select>
                  </InputGroup>
                  {errors.role && (
                    <span className="text-danger" style={{ fontSize: "13px" }}>
                      {errors.role}
                    </span>
                  )}
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                  {errors.email && (
                    <span className="text-danger" style={{ fontSize: "13px" }}>
                      {errors.email}
                    </span>
                  )}
                </FormGroup>
                {typeModal == "create" && (
                  <>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          autoComplete="new-password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </InputGroup>
                      {errors.password && (
                        <span
                          className="text-danger"
                          style={{ fontSize: "13px" }}
                        >
                          {errors.password}
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Confirm Password"
                          type="password"
                          autoComplete="new-password"
                          onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>
                  </>
                )}
              </Form>
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
                Save changes
              </Button>
            </div>
          </Modal>
        </Row>
      </Container>
    </>
  );
};
export default Intern;
