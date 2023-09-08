import React, { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
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
  createEventReservation,
  getListSalle,
  listEvent,
  removeEvent,
} from "../service/frontendService";
const localizer = momentLocalizer(moment);

const Event = () => {
  const [myEvents, setEvents] = useState([]);

  const [salles, setSalles] = useState("");

  useEffect(() => {
    getSalle();
    getEvent();
  }, []);

  const getSalle = async () => {
    try {
      const res = await getListSalle(
        JSON.parse(localStorage.getItem("auth")).userid
      );
      setSalles(res);
    } catch (error) {}
  };
  const createReservation = async (title, start, end, idSalle) => {
    try {
      const data = {
        title,
        start,
        end,
        elementId: idSalle,
      };
      const res = await createEventReservation(
        JSON.parse(localStorage.getItem("auth")).userid,
        data
      );
      formatDateEvent(res);
    } catch (error) {}
  };
  const removeReservation = async (idevent, idSalle) => {
    try {
      const res = await removeEvent(idevent, idSalle);
      formatDateEvent(res);
      Swal.fire("Event Removed!", "The event has been removed.", "success");
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
      });
    });
    setEvents(res);
  };
  const getEvent = async () => {
    try {
      let id = JSON.parse(localStorage.getItem("auth")).userid;
      const res = await listEvent(id);
      formatDateEvent(res);
    } catch (error) {}
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    var style = {
      backgroundColor: getRandomColor(),
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
      const formattedStartTime = moment(event.start).format("LT");
      const formattedEndTime = moment(event.end).format("LT");
      const formattedDay = moment(event.start).format("LL");
      if (
        event.user.id == JSON.parse(localStorage.getItem("auth")).userid &&
        event.end > new Date()
      )
        Swal.fire({
          html: `<h2>Remove Event at ${formattedDay} </h2> Are you sure you want to remove the event: 
        <strong>${event.title}</strong>(<strong>${formattedStartTime}</strong> - <strong>${formattedEndTime}</strong>)?`,
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
      else
        Swal.fire({
          position: "top-end",
          icon: "info",
          html: `
        <p>
        Impossible de supprimer cet evenement
        </p>
      `,
          showConfirmButton: false,
          timer: 2000,
        });
    },
    [myEvents, setEvents]
  );
  const minTime = new Date().setHours(7, 0, 0); // 8:00 AM
  const maxTime = new Date().setHours(20, 0, 0); // 6:00 PM
  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      // Check for conflicts with existing events
      const isConflict = myEvents.some((event) => {
        return (
          (start >= event.start && start < event.end) ||
          (end > event.start && end <= event.end) ||
          (start <= event.start && end >= event.end)
        );
      });

      if (isConflict) {
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
        } else
          Swal.fire({
            html: `<h2>Reservation du ${formattedDay}</h2>
          <span>${formattedStartTime} - ${formattedEndTime}</span>`,
            input: "text",
            inputLabel: "Entrer un intutilé de reservation",
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "You need to write something!";
              } else {
                createReservation(value, start, end);
              }
            },
          });
      }
    },
    [myEvents, setEvents]
  );
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
                  views={["day", "week", "agenda"]}
                  min={minTime}
                  max={maxTime}
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
