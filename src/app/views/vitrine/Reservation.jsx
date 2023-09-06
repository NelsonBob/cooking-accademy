import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  UncontrolledCarousel,
} from "reactstrap";
import Swal from "sweetalert2";
import { getSalleById, readFile } from "../../service/frontendService";
const localizer = momentLocalizer(moment);

const Reservation = () => {
  const [tableData, setTableData] = useState({});
  const [imageUrls, setImageUrls] = useState([]);
  const [reserve, setReserve] = useState(false);
  const idSalle = localStorage.getItem("idSalle");
  const navigate = useNavigate();
  useEffect(() => {}, [imageUrls]);
  useEffect(() => {
    getSalle();
  }, []);

  const getSalle = async () => {
    try {
      const res = await getSalleById(idSalle);
      let newgal = await callGal(res.gallerie);
      setImageUrls(newgal);
      setTableData(res);
    } catch (error) {}
  };
  const callGal = (galleries) => {
    let lienurl = [];
    galleries.forEach(async (el, index) => {
      const elUrl = await getFile(el);
      lienurl.push({ src: elUrl, key: index, caption: "" });
    });
    return lienurl;
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

  const [myEvents, setEvents] = useState([
    {
      id: 0,
      title: "All Day Event very long title",
      allDay: true,
      start: new Date(2023, 9, 0),
      end: new Date(2023, 9, 1),
    },
  ]);
  const minTime = new Date().setHours(8, 0, 0); // 8:00 AM
  const maxTime = new Date().setHours(18, 0, 0); // 6:00 PM

  const handleSelectEvent = useCallback(
    (event) => {
      const formattedStartTime = moment(event.start).format("LT");
      const formattedEndTime = moment(event.end).format("LT");
      const formattedDay = moment(event.start).format("LL");
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
          // User confirmed the removal, remove the event from myEvents
          const updatedEvents = myEvents.filter(
            (e) =>
              e.start !== event.start &&
              e.end !== event.end &&
              e.title !== event.title
          );
          setEvents(updatedEvents);
          Swal.fire("Event Removed!", "The event has been removed.", "success");
        }
      });
    },
    [myEvents, setEvents]
  );
  const handleReserve = () => {
    if (JSON.parse(localStorage.getItem("auth"))?.userid) setReserve(!reserve);
    else {
      Swal.fire({
        position: "top-end",
        icon: "info",
        html: `
        <p>
          Veuillez vous connecter avant d'effectuer une reservation
        </p>
      `,
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/out/login");
    }
  };

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
        const formattedStartTime = moment(start).format("LT");
        const formattedEndTime = moment(end).format("LT");
        const formattedDay = moment(start).format("LL");

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
              setEvents((prev) => [...prev, { start, end, title: value }]);
            }
          },
        });
      }
    },
    [myEvents, setEvents]
  );

  if (!idSalle) return navigate("/out/location");
  else
    return (
      <>
        <div className="header bg-gradient-info py-7 py-lg-8">
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        <Container className="mt--8 pb-5 position-relative">
          <Row>
            {!tableData ? (
              <Col md={12} className="my-4 d-flex justify-content-center">
                <div className="spinner-grow text-warning" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </Col>
            ) : (
              <>
                <Col md={6} className="my-4">
                  <h1 className="text-white">{tableData.name}</h1>
                  <p>
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                    {tableData.adress}
                  </p>
                </Col>
                <Col
                  md={6}
                  className="my-4 d-flex justify-content-end align-items-baseline"
                >
                  <Button color="primary" onClick={() => handleReserve()}>
                    {reserve ? "Retour" : "Réserver maintenant"}
                  </Button>{" "}
                </Col>
                {!reserve ? (
                  <>
                    <Col md={12} className="mb-2">
                      <UncontrolledCarousel
                        items={imageUrls}
                        className="reservation"
                      />
                    </Col>
                    <Col md={12}>
                      <h2>Description</h2>
                      <p>{tableData.description}</p>
                    </Col>
                  </>
                ) : (
                  <Col lg={12}>
                    <div>
                      <h1>Reservation System</h1>
                      <Card className="p-4">
                        <Calendar
                          defaultDate={new Date()}
                          defaultView="day"
                          events={myEvents}
                          localizer={localizer}
                          onSelectEvent={handleSelectEvent}
                          onSelectSlot={handleSelectSlot}
                          views={["day"]}
                          min={minTime}
                          max={maxTime}
                          selectable
                        />
                      </Card>
                    </div>
                  </Col>
                )}
              </>
            )}
          </Row>
        </Container>
      </>
    );
};

export default Reservation;
