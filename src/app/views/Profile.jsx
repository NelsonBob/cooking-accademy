import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import UserHeader from "../components/Headers/UserHeader";
import {
  UpdateFile,
  UploadFile,
  getFile,
  readFile,
  removeFile,
  updatePicture,
  updateProfilClient,
  updateProfilIntern,
} from "../service/frontendService";

const Profile = () => {
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem("auth"))?.token.name
  );
  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem("auth"))?.token.sub
  );
  const [adress, setAdress] = useState(
    JSON.parse(localStorage.getItem("auth"))?.token.fonction
  );
  const [errors, setErrors] = useState({});
  const [password_confirm, setPasswordConfirm] = useState("");
  const [password, setPassword] = useState("");
  const fileInputRef = useRef(null);
  const [imgPath, setImgPath] = useState(null);
  const [imgPathLast, setImgPathLast] = useState([]);
  const [imgContent, setImgContent] = useState(null);
  useEffect(() => {
    getPicture();
  }, []);
  const getPicture = async () => {
    if (JSON.parse(localStorage.getItem("auth"))?.token.picture) {
      let imgUrl = await getFile(
        JSON.parse(localStorage.getItem("auth"))?.token.picture
      );
      setImgContent(imgUrl);
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!adress) {
      formIsValid = false;
      newErrors.adress = "Field is required";
    }
    if (!name) {
      formIsValid = false;
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return formIsValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      let id = JSON.parse(localStorage.getItem("auth"))?.userid;
      let data = {
        name,
        fontion: adress,
      };
      try {
        let user;
        if (JSON.parse(localStorage.getItem("auth"))?.token.role == "Client")
          user = await updateProfilClient(id, data);
        if (JSON.parse(localStorage.getItem("auth"))?.token.role !== "Client")
          user = await updateProfilIntern(id, data);
        if (user) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Compte crée avec succès",
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
    }
  };
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
  };

  const handleFileChange = async (event) => {
    const contentFile = event.target.files[0];
    const formData = new FormData();
    formData.append("file", contentFile);
    if (contentFile)
      if (!imgPath || imgPath == "") {
        let tabUrl = [];
        const response = await UploadFile(formData);
        tabUrl.push(response);
        updateMethod(response);
        setImgPath(response);
        setImgPathLast([...imgPathLast, tabUrl]);
        let imgUrl = await getFile(response);
        setImgContent(imgUrl);
      } else {
        const response = await UpdateFile(imgPath, formData);
        updateMethod(response);
        let imgUrl = await getFile(response);
        setImgContent(imgUrl);
        setImgPath(response);
      }
  };
 
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const updateMethod = async (img) => {
    let data = {
      imgPath: img,
    };
    try {
      const user = await updatePicture(
        JSON.parse(localStorage.getItem("auth"))?.userid,
        data
      );
      imgPathLast.forEach(async (el) => {
        if (el != img) await removeFileUpload(el);
      });

      setImgPathLast([]);
      setImgPath("");
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
    } catch (error) {}
  };
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--9" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={handleImageClick}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          imgContent
                            ? imgContent
                            : require("../../assets/img/brand/icon-4399701_1280.webp")
                        }
                      />
                    </a>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>
                </Col>
              </Row>

              <CardBody className="pt-0 pt-md-7">
                <Row>
                  {/* <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-4">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div> */}
                </Row>
                <div className="text-center">
                  <h3>{JSON.parse(localStorage.getItem("auth"))?.userName}</h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {JSON.parse(localStorage.getItem("auth"))?.fonction}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col>
                    <h3 className="mb-0">My account</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div>
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h6 className="heading-small text-muted mb-4">
                          User information
                        </h6>{" "}
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={handleSubmit}
                          size="sm"
                        >
                          Update profil
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            value={name}
                          />
                          {errors.name && (
                            <span
                              className="text-danger"
                              style={{ fontSize: "13px" }}
                            >
                              {errors.name}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                            value={email}
                            disabled
                          />
                          {errors.email && (
                            <span
                              className="text-danger"
                              style={{ fontSize: "13px" }}
                            >
                              {errors.email}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            {JSON.parse(localStorage.getItem("auth"))?.token
                              .role == "Client"
                              ? "Adress"
                              : "Fonction"}
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={adress}
                            id="input-first-name"
                            placeholder={
                              JSON.parse(localStorage.getItem("auth"))?.token
                                .role == "Client"
                                ? "Adress"
                                : "Fonction"
                            }
                            type="text"
                            onChange={(e) => setAdress(e.target.value)}
                          />
                          {errors.adress && (
                            <span
                              className="text-danger"
                              style={{ fontSize: "13px" }}
                            >
                              {errors.adress}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <div>
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h6 className="heading-small text-muted mb-4">
                          Change Password
                        </h6>{" "}
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={handleSubmitPassword}
                          size="sm"
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label className="form-control-label">Password</label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </FormGroup>
                        {errors.password && (
                          <span
                            className="text-danger"
                            style={{ fontSize: "13px" }}
                          >
                            {errors.password}
                          </span>
                        )}
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <label className="form-control-label">
                            Confirm Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Confirm Password"
                            type="password"
                            autoComplete="new-password"
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
