import moment from "moment";
import React from "react";
import { Button, Col, Row } from "reactstrap";
const Post = (props) => {
  return (
    <>
      <div className="shadow-sm p-3 mb-5 bg-white rounded">
        <div className="d-flex">
          <div>
            <img
              src={
                "https://ui-avatars.com/api/?background=0D8ABC&color=fff&size=40&name=" +
                props.post.author.name
              }
              className="rounded-circle mr-2"
              alt=""
            />
          </div>
          <div>
            <h4 className="mb-0">{props.post.author.name}</h4>
            <span className="text-muted small">
              {moment(props.post.datepost).calendar()}
            </span>
          </div>
        </div>
        <div className="w-100">
          <p>{props.post.description}</p>
          <img className="img-fluid" src={props.imageUrls} alt="" />
        </div>

        <Row className="mt-2">
          <Col xs="4" xl="4">
            <Button
              className="btn-icon btn-3"
              color={props.post.isLikes ? "primary" : "secondary"}
              onClick={() => props.like(props.post.id)}
              block
              type="button"
            >
              <span className="btn-inner--icon">
                <i className="ni ni-like-2" />
              </span>
              <span className="btn-inner--text">
                J'aime {props.post.nbLikes}
              </span>
            </Button>
          </Col>
          <Col xs="4" xl="4">
            <Button
              className="btn-icon btn-3"
              color="secondary"
              block
              type="button"
              onClick={() => props.comment(props.post.id)}
            >
              <span className="btn-inner--icon">
                <i className="ni ni-chat-round" />
              </span>
              <span className="btn-inner--text">
                Commenter {props.post.comments.length}
              </span>
            </Button>
          </Col>
          <Col xs="4" xl="4">
            <Button
              className="btn-icon btn-3"
              color="secondary"
              block
              onClick={() => props.share(props.post.id)}
              type="button"
            >
              <span className="btn-inner--icon">
                <i className="ni ni-curved-next" />
              </span>
              <span className="btn-inner--text">Republier</span>
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Post;
