import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { getListRepasActif } from "../../service/frontendService";
function Avis() {
  const { t } = useTranslation();
  const [note, setNote] = useState(null);
  const emojis = [
    {
      id: 0,
      name: "Sad",
      imageUrl: "https://assets.ccbp.in/frontend/react-js/sad-emoji-img.png",
    },
    {
      id: 1,
      name: "None",
      imageUrl: "https://assets.ccbp.in/frontend/react-js/none-emoji-img.png",
    },
    {
      id: 2,
      name: "Happy",
      imageUrl: "https://assets.ccbp.in/frontend/react-js/happy-emoji-img.png",
    },
  ];
  const loveEmojiUrl =
    "https://assets.ccbp.in/frontend/react-js/love-emoji-img.png";
  const location = useLocation();

  const id = new URLSearchParams(location.search).get("id");
  const giveAvis = async (idnote) => {
    console.log("rrrrrrrrrrrrr  ", idnote);
    setNote(idnote);
    try {
      // const res = await getListRepasActif();
    } catch (error) {}
  };
  // useEffect(() => {}, [note]);
  return (
    <>
      {note ? (
        <div className="header bg-gradient-success py-7 py-lg-8">
          <Row className="justify-content-center">
            <Col md={12} className="my-4">
              <Row className="justify-content-center">
                <Col md={6} className="my-4 bg-white text-center ">
                  <img src={loveEmojiUrl} className="emoji mt-2" />
                  <h1 className="text-center">Thank You!</h1>
                  <p className="text-center">
                    We’ll use your feedback to improve our customer support
                    performance.
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      ) : (
        <div className="header bg-gradient-primary py-7 py-lg-8">
          <Row className="justify-content-center">
            <Col md={12} className="my-4">
              <Row className="justify-content-center">
                <Col md={6} className="my-4 bg-white">
                  <h1 className="text-center mt-2">
                    how satisfied are you with our plaform performance?
                  </h1>
                  <ul className="emojis-list-container">
                    {emojis.map((emoji) => (
                      <li
                        key={emoji.id}
                        className="list-item-container"
                        onClick={(e) => giveAvis(emoji.name)}
                      >
                        <img
                          src={emoji.imageUrl}
                          alt={emoji.name}
                          className="emoji"
                        />
                        <p className="emoji-title">{emoji.name}</p>
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default Avis;
