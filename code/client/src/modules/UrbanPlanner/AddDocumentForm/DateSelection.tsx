import { Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";

const DateSelection = (props: any) => {
  const [createdAt, setCreatedAt] = useState(
    props.document ? props.document.CreatedAt : ""
  );

  useEffect(() => {
    if (props.setDocument) {
      props.setDocument((prevDocument: any) => ({
        ...prevDocument,
        CreatedAt: createdAt,
      }));
    }
  }, [createdAt, props.setDocument]);

  return (
    <Form.Group as={Col} controlId="formGridDate">
      <Form.Label className="black-text">Date</Form.Label>
      <Form.Control
        type="date"
        value={createdAt}
        onChange={(event) => setCreatedAt(event.target.value)}
        className="font-size-20"
      />
    </Form.Group>
  );
};

export default DateSelection;
