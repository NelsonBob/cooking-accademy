import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Col, Row } from "reactstrap";
import SentimentDissatisfiedIcon from "../../../assets/img/emoji/SentimentDissatisfiedIcon.svg";
import SentimentNeutral from "../../../assets/img/emoji/SentimentNeutral.svg";
import SentimentSatisfiedAltIcon from "../../../assets/img/emoji/SentimentSatisfiedAltIcon.svg";
import SentimentVeryDissatisfiedIcon from "../../../assets/img/emoji/SentimentVeryDissatisfiedIcon.svg";
import SentimentVerySatisfiedIcon from "../../../assets/img/emoji/SentimentVerySatisfiedIcon.svg";
import { getAvisExist, giveAvis } from "../../service/frontendService";

function Avis() {
  const { t } = useTranslation();
  const [note, setNote] = useState(null);
  const [exist, setExist] = useState(null);
  const emojis = [
    {
      id: 0,
      name: "Very Dissatisfied",
      imageUrl: SentimentVeryDissatisfiedIcon,
    },
    {
      id: 1,
      name: "Dissatisfied",
      imageUrl: SentimentDissatisfiedIcon,
    },
    {
      id: 2,
      name: "Neutral",
      imageUrl: SentimentNeutral,
    },
    {
      id: 3,
      name: "Satisfied",
      imageUrl: SentimentSatisfiedAltIcon,
    },
    {
      id: 4,
      name: "Very Satisfied",
      imageUrl: SentimentVerySatisfiedIcon,
    },
  ];
  const loveEmojiUrl =
    "https://assets.ccbp.in/frontend/react-js/love-emoji-img.png";
  const location = useLocation();

  const id = new URLSearchParams(location.search).get("id");

  const avis = async (idnote) => {
    try {
      const res = await giveAvis(id, idnote + 1);
      setNote(idnote);
    } catch (error) {}
  };

  const getExistAvis = async () => {
    try {
      const res = await getAvisExist(id);
      setExist(res);
    } catch (error) {}
  };
  useEffect(() => {
    getExistAvis();
  }, []);

  return (
    <>
      {note || exist ? (
        <div className="header bg-gradient-success py-7 py-lg-8">
          <Row className="justify-content-center mx-0">
            <Col md={12} className="my-4">
              <Row className="justify-content-center">
                <Col md={7} className="my-4 bg-white text-center ">
                  <img src={loveEmojiUrl} className="emoji mt-2" alt="" />
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
          <Row className="justify-content-center  mx-0">
            <Col md={12} className="my-4">
              <Row className="justify-content-center">
                <Col md={7} className="my-4 bg-white">
                  <h1 className="text-center mt-2">
                    how satisfied are you with our plaform performance?
                  </h1>
                  <div className="mt-3 d-flex justify-content-between">
                    {emojis.map((emoji) => (
                      <div
                        key={emoji.id}
                        onClick={(e) => avis(emoji.id)}
                        className="text-center"
                      >
                        <img
                          src={emoji.imageUrl}
                          alt={emoji.name}
                          className={"emoji"}
                        />
                        <p className="emoji-title">{emoji.name}</p>
                      </div>
                    ))}
                  </div>
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
