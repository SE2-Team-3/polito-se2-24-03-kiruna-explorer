import { Row, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../../style.css";
import { Props, NewDocument } from "../interfaces/types";

const DocumentDetails = (props: Props) => {
  const [title, setTitle] = useState(
    props.document ? props.document.title : ""
  );
  const [description, setDescription] = useState(
    props.document ? props.document.description : ""
  );

  useEffect(() => {
    if (props.setDocument) {
      props.setDocument((prevDocument: NewDocument) => ({
        ...prevDocument,
        title: title,
        description: description,
      }));
    }
  }, [title, description, props.setDocument]);

  return (
    <>
      <Row className="row-box">
        <Form.Label className="black-text">Title *</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title of document"
          className="font-size-20"
        />
        <Form.Control.Feedback type="invalid">
          Please enter the document title
        </Form.Control.Feedback>
      </Row>
      <Row className="row-box">
        <Form.Label className="black-text">Description *</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter your description here"
          className="font-size-20"
        />
        <Form.Control.Feedback type="invalid">
          Please enter a description
        </Form.Control.Feedback>
      </Row>
    </>
  );
};

export default DocumentDetails;
