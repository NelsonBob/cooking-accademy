import Multiselect from "multiselect-react-dropdown";
import React, { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReactDOM from "react-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";

import moment from "moment";
import {
  createEventWithUserReservation,
  listEvent,
  listEventUsers,
  listUser,
  removeEvenement,
  removeEvent,
  updateEvent,
  updateEventUsers,
} from "../service/frontendService";
const localizer = momentLocalizer(moment);

const Event = () => {
  const [myEvents, setEvents] = useState([]);
  const [options, setOptions] = useState([
    // { name: "Option 1️", id: 1 },
    // { name: "Option 2️", id: 2 },
  ]);
  const minTime = new Date().setHours(7, 0, 0); // 8:00 AM
  const maxTime = new Date().setHours(19, 0, 0); // 6:00 PM
  const [selectedValue, setSelectedValue] = useState([]);

  useEffect(() => {
    getEvent();
    getUsers();
  }, []);

  useEffect(() => {}, [options]);
  useEffect(() => {
    console.log("selectedValue ", selectedValue);
  }, [selectedValue]);
  const createEvenement = async (title, start, end) => {
    console.log("selectedValue selectedValue ", selectedValue);

    try {
      const data = {
        title,
        start,
        end,
        users: selectedValue,
      };
      const res = await createEventWithUserReservation(
        JSON.parse(localStorage.getItem("auth")).userid,
        data
      );
      getEvent();
      Swal.fire("Event crée!", "The event has been created.", "success");
    } catch (error) {}
  };

  const removeReservation = async (idevent) => {
    try {
      const res = await removeEvenement(idevent);
      getEvent();
      Swal.fire("Event Removed!", "The event has been removed.", "success");
    } catch (error) {}
  };
  const confirmReservation = async (idevent, type) => {
    try {
      let data = {
        statusEvent: type,
        id: idevent,
      };
      let id = JSON.parse(localStorage.getItem("auth")).userid;
      const res = await updateEvent(id, data);
      if (res && res.length > 0) formatDateEvent(res);
      Swal.fire("Event Updated!", "The event has been update.", "success");
    } catch (error) {}
  };

  const confirmParticipation = async (idevent, type) => {
    try {
      let data = {
        statusEvent: type,
        id: idevent,
      };
      let id = JSON.parse(localStorage.getItem("auth")).userid;
      const res = await updateEventUsers(id, data);
      if (res && res.length > 0) formatDateEvent(res);
      Swal.fire(
        "Participation Updated!",
        "The event has been update.",
        "success"
      );
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
        typeEventEnum: it.typeEventEnum,
        status: it.status,
      });
    });
    setEvents(res);
  };
  const getEvent = async () => {
    try {
      let id = JSON.parse(localStorage.getItem("auth")).userid;
      const res = await listEvent(id);
      const res1 = await listEventUsers(id);
      let concatenatedArray = res.concat(res1);

      if (concatenatedArray && concatenatedArray.length > 0)
        formatDateEvent(concatenatedArray);
    } catch (error) {}
  };
  const getUsers = async () => {
    try {
      let id = JSON.parse(localStorage.getItem("auth")).userid;
      const res = await listUser(id);
      setOptions(res);
    } catch (error) {}
  };
  const eventStyleGetter = (event) => {
    let color = "";
    if (event.status == "Pending") color = "#ffd600";
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
        if (event.status == "Pending") {
          if (
            event.user.id == JSON.parse(localStorage.getItem("auth")).userid &&
            event.end > new Date() &&
            event.typeEventEnum != "Reservation"
          ) {
            Swal.fire({
              html: `<h2>Remove Event at ${formattedDay} </h2> Are you sure you want to remove the event: 
                    <strong>${event.title}</strong>
                    (<strong>${formattedStartTime}</strong> - <strong>${formattedEndTime}</strong>)?`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, remove it!",
            }).then((result) => {
              if (result.isConfirmed) {
                removeReservation(event.id);
              }
            });
            return;
          } else if (
            event.user.id != JSON.parse(localStorage.getItem("auth")).userid &&
            JSON.parse(localStorage.getItem("auth")).token.role == "Admin" &&
            event.end > new Date() &&
            event.typeEventEnum == "Reservation"
          ) {
            Swal.fire({
              html: `<h2>Confirm reservation at ${formattedDay} </h2> Are you sure you want to confirm the reservation: 
                <strong>${event.title}</strong>
                (<strong>${formattedStartTime}</strong> - <strong>${formattedEndTime}</strong>)?`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, confirm it!",
              cancelButtonText: "No, confirm it!",
              reverseButtons: true,
            }).then((result) => {
              if (result.isConfirmed) {
                confirmReservation(event.id, "Confirm");
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                console.log("Cancel");
              } else {
                confirmReservation(event.id, "Cancel");
              }
            });
            return;
          } else if (
            event.user.id != JSON.parse(localStorage.getItem("auth")).userid &&
            event.end > new Date() &&
            event.typeEventEnum != "Reservation"
          ) {
            Swal.fire({
              html: `<h2>Confirm participation event at ${formattedDay} </h2> Are you sure you want to confirm the participation: 
        <strong>${event.title}</strong>(<strong>${formattedStartTime}</strong> - <strong>${formattedEndTime}</strong>)?`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, confirm it!",
              cancelButtonText: "No, confirm it!",
              reverseButtons: true,
            }).then((result) => {
              if (result.isConfirmed) {
                confirmParticipation(event.id, "Confirm");
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                console.log("Cancel");
              } else {
                confirmParticipation(event.id, "Cancel");
              }
            });
            return;
          } else {
            Swal.fire({
              position: "top-end",
              icon: "info",
              html: `<h2>Event at ${formattedDay} </h2> Information event is : 
              <strong>${event.title}</strong>(<strong>${formattedStartTime}</strong> - <strong>${formattedEndTime}</strong>)?`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        } else {
          Swal.fire({
            position: "top-end",
            icon: "info",
            html: `<h2>Event at ${formattedDay} </h2> Information event is : 
            <strong>${event.title}</strong>(<strong>${formattedStartTime}</strong> - <strong>${formattedEndTime}</strong>)?`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    },
    [myEvents, setEvents]
  );
  const handleSelect = (selectedList, selectedItem) => {
    console.log("rrrrrrreeee ", selectedList);
    setSelectedValue(selectedList);
  };

  const handleRemove = (selectedList, removedItem) => {
    setSelectedValue(selectedList);
  };
  const multiselect = (
    <Multiselect
      options={options}
      selectedValues={selectedValue}
      onSelect={handleSelect}
      onRemove={handleRemove}
      displayValue="name"
    />
  );
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
          position: "top-end",
          icon: "error",
          html: `
          <p>
            This time slot conflicts with an existing event. Please choose a
            different time.
          </p>
        `,
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
            position: "top-end",
            icon: "error",
            html: `
              <p>
                You cannot create an event in the past. Please choose a future time.
              </p>
            `,
            showConfirmButton: false,
            timer: 2000,
          });
          return;
        } else {
          Swal.fire({
            html: `<h2>Event du ${formattedDay}</h2>
            <p className="mb-2">${formattedStartTime} - ${formattedEndTime}</p>
            <div id="multiselect-container"></div>
            `,
            showCancelButton: true,
            confirmButtonText: "Save",
            input: "text",
            inputLabel: "Entrer un intutilé de reservation",
            inputValidator: (value) => {
              if (!value) {
                return "You need to write something!";
              } else {
                if (!value) {
                  return "You need to write something!";
                }
              }
            },
            didOpen: () => {
              // Use setTimeout to ensure that the Multiselect component is rendered
              setTimeout(() => {
                ReactDOM.render(
                  multiselect,
                  document.getElementById("multiselect-container")
                );
              }, 0);
            },
            preConfirm: () => {
              const value = Swal.getInput().value; // Get the input value
              const selectedOptions = selectedValue;

              // Check both conditions before calling createEvenement
              if (value && selectedOptions && selectedOptions.length > 0) {
                createEvenement(value, start, end);
              }
            },
          });
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
        </Row>
      </Container>
    </>
  );
};
export default Event;
