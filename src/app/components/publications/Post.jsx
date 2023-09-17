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
                props.post.author
              }
              className="rounded-circle mr-2"
              alt=""
            />
          </div>
          <div>
            <h4 className="mb-0">{props.post.author}</h4>
            <span className="text-muted small">{props.post.created_at}</span>
          </div>
        </div>
        <div className="w-100">
          <p>{props.post.description}</p>
          <img className="img-fluid" src={props.post.image} alt="" />
        </div>

<Row className="mt-2">
    <Col lg="6" xl="4">
    <Button
            className="btn-icon btn-3"
            color="secondary"
            outline
            block
            type="button"
          >
            <span className="btn-inner--icon">
              <i className="ni ni-like-2" />
            </span>
            <span className="btn-inner--text">J'aime 0</span>
          </Button>
    </Col>
    <Col lg="6" xl="4">
    <Button
            className="btn-icon btn-3"
            color="secondary"
            outline
            block
            type="button"
            onClick={() => props.comment(props.post.id)}
          >
            <span className="btn-inner--icon">
              <i className="ni ni-chat-round" />
            </span>
            <span className="btn-inner--text">Commenter {props.post.id}</span>
          </Button>
    </Col>
    <Col lg="6" xl="4">
    <Button
            className="btn-icon btn-3"
            color="secondary"
            outline
            block
            type="button"
          >
            <span className="btn-inner--icon">
              <i className="ni ni-curved-next" />
            </span>
            <span className="btn-inner--text">Partager</span>
          </Button>
    </Col>
</Row>
       
      </div>
    </>
  );
};

export default Post;
