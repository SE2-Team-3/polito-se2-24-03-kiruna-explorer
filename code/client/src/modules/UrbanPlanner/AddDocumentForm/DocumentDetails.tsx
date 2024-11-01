import { Row, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";

const DocumentDetails = (props: any) => {
  const [title, setTitle] = useState(
    props.document ? props.document.Title : ""
  );
  const [description, setDescription] = useState(
    props.document ? props.document.Description : ""
  );

  useEffect(() => {
    if (props.setDocument) {
      props.setDocument((prevDocument: any) => ({
        ...prevDocument,
        Title: title,
        Description: description,
      }));
    }
  }, [title, description, props.setDocument]);

  return (
    <>
      <Row className="row-box">
        <Form.Label className="black-text">Title *</Form.Label>
        <Form.Control
          required
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title of document"
        />
        <Form.Control.Feedback type="invalid">
          Please enter the document title
        </Form.Control.Feedback>
      </Row>
      <Row className="row-box">
        <Form.Label className="black-text">Description *</Form.Label>
        <Form.Control
          required
          as="textarea"
          rows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter your description here"
        />
        <Form.Control.Feedback type="invalid">
          Please enter a description
        </Form.Control.Feedback>
      </Row>
    </>
  );
};

export default DocumentDetails;
