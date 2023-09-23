import Multiselect from "multiselect-react-dropdown";
import React, { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  PopoverBody,
  Row,
  UncontrolledPopover,
} from "reactstrap";
import Swal from "sweetalert2";

import moment from "moment";
import {
  createEventWithUserReservation,
  infoEvent,
  listEvent,
  listEventUsers,
  listUser,
  removeEvenement,
  updateEvent,
  updateEventUsers,
} from "../service/frontendService";
const localizer = momentLocalizer(moment);

const Event = () => {
  const [myEvents, setEvents] = useState([]);
  const [formattedDay1, setFormattedDay1] = useState("");
  const [formattedStartTime1, setFormattedStartTime1] = useState("");
  const [formattedEndTime1, setFormattedEndTime1] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [reservationTitle, setReservationTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start1, setStart1] = useState("");
  const [end1, setEnd1] = useState("");
  const [options, setOptions] = useState([]);
  const minTime = new Date().setHours(7, 0, 0); // 8:00 AM
  const maxTime = new Date().setHours(19, 0, 0); // 6:00 PM
  const [selectedValue, setSelectedValue] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getEvent();
    getUsers();
  }, []);

  useEffect(() => {}, [options]);
  useEffect(() => {}, [selectedValue]);
  const closeModal = () => {
    setModalVisible(false);
  };
  const handleSave = () => {
    // Handle the form submission here
    const value = reservationTitle;
    if (validateForm()) createEvenement(value, start1, end1);
  };
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};
    if (!reservationTitle) {
      formIsValid = false;
      newErrors.reservationTitle = "Title is required";
    }
    if (!description) {
      formIsValid = false;
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return formIsValid;
  };
  const createEvenement = async (title, start, end) => {
    try {
      const data = {
        title,
        start,
        end,
        users: selectedValue,
        description,
      };
      const res = await createEventWithUserReservation(
        JSON.parse(localStorage.getItem("auth"))?.userid,
        data
      );
      setSelectedValue([]);
      setReservationTitle("");
      setDescription("");
      setEnd1("");
      setStart1("");
      getEvent();
      Swal.fire({
        title: "The event has been created.",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "bg-success",
        },
      });
      closeModal();
    } catch (error) {}
  };

  const removeReservation = async (idevent) => {
    try {
      const res = await removeEvenement(idevent);
      getEvent();
      Swal.fire({
        title: "The event has been removed.",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "bg-success",
        },
      });
    } catch (error) {}
  };
  const confirmReservation = async (idevent, type) => {
    try {
      let data = {
        statusEvent: type,
        id: idevent,
      };
      let id = JSON.parse(localStorage.getItem("auth"))?.userid;
      const res = await updateEvent(id, data);
      formatDateEvent(res);
      Swal.fire({
        title: "The event has been update.",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "bg-success",
        },
      });
    } catch (error) {}
  };

  const confirmParticipation = async (idevent, type) => {
    try {
      let data = {
        statusEvent: type,
        id: idevent,
      };
      let id = JSON.parse(localStorage.getItem("auth"))?.userid;
      const res = await updateEventUsers(id, data);
      formatDateEvent(res);
      Swal.fire({
        icon: "success",
        title: "The event has been update.",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "bg-success text-white",
        },
      });
    } catch (error) {}
  };
  const formatDateEvent = (tab = []) => {
    let res = [];
    tab.forEach((it) => {
      res.push({
        id: it.id,
        title: it.title,
        start: new Date(it.start),
        end: new Date(it.end),
        user: it.user,
        description: it.description,
        typeEventEnum: it.typeEventEnum,
        idcreator: it.idcreator,
        ideventuser: it?.ideventuser,
        status: it.status,
      });
    });
    setEvents(res);
  };
  const getEvent = async () => {
    try {
      let id = JSON.parse(localStorage.getItem("auth"))?.userid;
      const res = await listEvent(id);
      const res1 = await listEventUsers(id);
      let concatenatedArray = res.concat(res1);
      formatDateEvent(concatenatedArray);
    } catch (error) {}
  };

  const getEventHtml = (res) => {
    const formattedStartTime = moment(res.start).format("LT");
    const formattedEndTime = moment(res.end).format("LT");
    const formattedDay = moment(res.start).format("LL");

    let html = `<h2>Event at ${res.title}</h2>
                <strong>Description:</strong> ${res.description}<br/>
                <br/> 
                <strong>Date: </strong> ${formattedDay}<br/><br/>
                <strong>Heure: </strong> ${formattedStartTime} - ${formattedEndTime}<br/><br/>
                <strong>Nombre de participant(s):</strong> ${res.participants.length}
                <br/><br/>
                <strong>Liste de Participant(s):</strong><br/> `;

    if (res.participants.length > 0) {
      res.participants.forEach((item, index) => {
        html += `<div key="${index}" class=${
          item.status == "Pending"
            ? "bg-warning py-2 text-white"
            : item.status == "Confirm"
            ? "bg-success py-2 text-white"
            : ""
        }>
         ${item.name} | ${item.email} (${
          item.status == "Pending"
            ? "En attente"
            : item.status == "Confirm"
            ? "Validé"
            : "Refusé"
        })<br/>
                 </div>`;
      });
    } else {
      html += "<strong> Aucun</strong>";
    }

    return html;
  };
  const getEventInfo = async (idk) => {
    try {
      let id = JSON.parse(localStorage.getItem("auth"))?.userid;
      const res = await infoEvent(id, idk);
      if (res) {
        Swal.fire({
          html: getEventHtml(res),
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!",
        }).then((result) => {
          if (result.isConfirmed) {
            removeReservation(res.id);
          }
        });
        return;
      }
    } catch (error) {}
  };
  const getUsers = async () => {
    try {
      let id = JSON.parse(localStorage.getItem("auth"))?.userid;
      const res = await listUser(id);
      setOptions(res);
    } catch (error) {}
  };
  const eventStyleGetter = (event) => {
    let color = "";
    if (event.status == "Pending") color = "#fb6340";
    else if (event.status == "Confirm") color = "#2dce89";
    else if (event.status == "Cancel") color = "#f5365c";
    else color = getRandomColor();
    var style = {
      backgroundColor: color,
      borderRadius: "0px",
      border: "0px",
    };
    return {
      style: style,
    };
  };
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const handleSelectEvent = useCallback(
    (event) => {
      if (event && event.title) {
        const formattedStartTime = moment(event.start).format("LT");
        const formattedEndTime = moment(event.end).format("LT");
        const formattedDay = moment(event.start).format("LL");
        if (
          event.idcreator == JSON.parse(localStorage.getItem("auth"))?.userid &&
          event.end > new Date() &&
          event.typeEventEnum != "Reservation"
        ) {
          getEventInfo(event.id);
          return;
        } else if (
          event.idcreator != JSON.parse(localStorage.getItem("auth"))?.userid &&
          JSON.parse(localStorage.getItem("auth"))?.token.role == "Admin" &&
          event.end > new Date() &&
          event.typeEventEnum == "Reservation" &&
          event.status == "Pending"
        ) {
          let tit = event.typeEventEnum == "Meeting" ? "Event" : "Reservation";
          let des =`<strong>Description:</strong> ${event.description}<br/><br/>`;
             

          Swal.fire({
            html: `<h2>Confirm ${tit} at ${event.title} </h2> 

            ${des}
                Are you sure you want to confirm the reservation: <strong>${formattedDay}</strong>
                <strong>${formattedStartTime}</strong> - <strong>${formattedEndTime}</strong>?`,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Accept",
            cancelButtonText: "Refuse",
          }).then((result) => {
            if (result.isConfirmed) {
              confirmReservation(event.id, "Confirm");
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              confirmReservation(event.id, "Cancel");
            } else {
            }
          });
          return;
        } else if (
          event.idcreator != JSON.parse(localStorage.getItem("auth"))?.userid &&
          event.end > new Date() &&
          event.typeEventEnum != "Reservation" &&
          event.status == "Pending"
        ) {
          Swal.fire({
            html: `<h2>Confirm participation event at ${event.title} </h2> 
            <strong>Description:</strong> ${event.description}<br/>
            <br/> 
              Are you sure you want to confirm the participation: <strong>${formattedDay}</strong>
              <strong>${formattedStartTime}</strong> - <strong>${formattedEndTime}</strong>?`,
            showCancelButton: true,
            icon: "info",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Accept",
            cancelButtonText: "Refuse",
          }).then((result) => {
            if (result.isConfirmed) {
              confirmParticipation(event.ideventuser, "Confirm");
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              confirmParticipation(event.ideventuser, "Cancel");
            } else {
            }
          });
          return;
        } else {
          let tit = event.typeEventEnum == "Meeting" ? "Event" : "Reservation";
          let des =
            event.typeEventEnum == "Meeting"
              ? event.description
                ? `<strong>Description:</strong> ${event.description}<br/><br/>`
                : ""
              : "";
          let stat =
            event.status == "Pending"
              ? "<br/><br/><strong>Statut: </strong>En attente de traitement"
              : event.status == "Confirm"
              ? "<br/><br/><strong>Statut: </strong>Validé"
              : "<br/><br/><strong>Statut: </strong>Refusé";
          Swal.fire({
            html: `<h2>${tit} at ${event.title} </h2>
            ${des}
            <strong>Date: </strong> ${formattedDay}<br/><br/>
            <strong>Heure: </strong> ${formattedStartTime} - ${formattedEndTime} ${stat}`,
            showConfirmButton: false,
          });
        }
      }
    },
    [myEvents, setEvents]
  );
  const handleSelect = (selectedList, selectedItem) => {
    setSelectedValue(selectedList);
  };

  const handleRemove = (selectedList, removedItem) => {
    setSelectedValue(selectedList);
  };

  const handleSelectSlot = useCallback(
    ({ start, end, status }) => {
      // Check for conflicts with existing events
      const isConflict = myEvents.some((event) => {
        return (
          (start >= event.start && start < event.end) ||
          (end > event.start && end <= event.end) ||
          (start <= event.start && end >= event.end)
        );
      });

      if (isConflict && status == "Confirm") {
        Swal.fire({
          html: `
          <p>
            This time slot conflicts with an existing event. Please choose a
            different time.
          </p>
        `,
          customClass: {
            popup: "bg-danger text-white",
          },
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        const now = new Date();
        const formattedStartTime = moment(start).format("LT");
        const formattedEndTime = moment(end).format("LT");
        const formattedDay = moment(start).format("LL");
        if (start <= now) {
          Swal.fire({
            html: `
              <p>
                You cannot create an event in the past. Please choose a future time.
              </p>
            `,
            showConfirmButton: false,
            customClass: {
              popup: "bg-danger text-white",
            },
            timer: 2000,
          });
          return;
        } else {
          setModalVisible(true);
          setStart1(start);
          setEnd1(end);
          setFormattedDay1(formattedDay);
          setFormattedStartTime1(formattedStartTime);
          setFormattedEndTime1(formattedEndTime);
        }
      }
    },
    [myEvents, setEvents]
  );

  useEffect(() => {}, [myEvents]);
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col md={12}>
                <h5 className="text-uppercase text-white mb-0">
                  Liste des evenements
                </h5>
              </Col>
              <Col md={12} className="mt-5">
                <FormGroup md={6}>
                  <Button color="info" type="button" onClick={getEvent}>
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
            <Row className="mb-3 d-flex justify-content-between">
              <Col xs={4}>
                <Button color="success" id="tooltip876279349" type="button">
                  Validé
                </Button>
                <UncontrolledPopover placement="top" target="tooltip876279349">
                  <PopoverBody>
                    When event is approved and can't update
                  </PopoverBody>
                </UncontrolledPopover>
              </Col>
              <Col xs={4}>
                <Button color="warning" id="tooltip8762749" type="button">
                  En attente
                </Button>
                <UncontrolledPopover placement="top" target="tooltip8762749">
                  <PopoverBody>
                    When event is pending or waiting validation
                  </PopoverBody>
                </UncontrolledPopover>
              </Col>
              <Col xs={4}>
                <Button color="danger" id="tooltip87627939" type="button">
                  Réfusé
                </Button>
                <UncontrolledPopover placement="top" target="tooltip87627939">
                  <PopoverBody>
                    When event is cancel or not approved
                  </PopoverBody>
                </UncontrolledPopover>
              </Col>
            </Row>
          </Col>
          <Col md={12}>
            <Card className="bg-gradient-default shadow">
              <CardBody>
                <Calendar
                  defaultDate={new Date()}
                  defaultView="month"
                  events={myEvents}
                  localizer={localizer}
                  onSelectEvent={handleSelectEvent}
                  onSelectSlot={handleSelectSlot}
                  min={minTime}
                  max={maxTime}
                  style={{ height: "100vh" }}
                  selectable
                  eventPropGetter={eventStyleGetter}
                />
              </CardBody>
            </Card>
          </Col>
          <Modal
            className="modal-dialog-centered"
            isOpen={modalVisible}
            toggle={closeModal}
          >
            <div className="modal-header">
              <h2 className="modal-title">Event du {formattedDay1}</h2>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={closeModal}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <Form role="form">
                <FormGroup>
                  {formattedStartTime1} - {formattedEndTime1}
                </FormGroup>
                <FormGroup>
                  <Label>Event title</Label>
                  <Input
                    type="text"
                    placeholder="Enter an event title"
                    value={reservationTitle}
                    onChange={(e) => setReservationTitle(e.target.value)}
                  />
                  {!reservationTitle && (
                    <>
                      {" "}
                      {errors.reservationTitle && (
                        <span
                          className="text-danger"
                          style={{ fontSize: "13px" }}
                        >
                          {errors.reservationTitle}
                        </span>
                      )}
                    </>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Participants</Label>
                  <Multiselect
                    options={options}
                    selectedValues={selectedValue}
                    onSelect={handleSelect}
                    onRemove={handleRemove}
                    displayValue="name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Description</Label>
                  <Input
                    type="textarea"
                    placeholder="Enter le lieu de l'evenement"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
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
                      )}
                    </>
                  )}
                </FormGroup>
              </Form>
            </div>
            <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={closeModal}
              >
                Close
              </Button>
              <Button color="primary" type="button" onClick={handleSave}>
                Save
              </Button>
            </div>
          </Modal>
        </Row>
      </Container>
    </>
  );
};
export default Event;
