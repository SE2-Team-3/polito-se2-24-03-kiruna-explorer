import { Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";
import { Props, NewDocument } from "./interfaces/types";

const DateSelection = (props: Props) => {
  const [issuanceDate, setIssuanceDate] = useState(
    props.document ? props.document.issuanceDate : ""
  );

  useEffect(() => {
    if (props.setDocument) {
      props.setDocument((prevDocument: NewDocument) => ({
        ...prevDocument,
        issuanceDate: issuanceDate,
      }));
    }
  }, [issuanceDate, props.setDocument]);

  return (
    <Form.Group as={Col} controlId="formGridDate">
      <Form.Label className="black-text">Date</Form.Label>
      <Form.Control
        type="date"
        value={issuanceDate}
        onChange={(event) => setIssuanceDate(event.target.value)}
        className="font-size-20"
      />
    </Form.Group>
  );
};

export default DateSelection;
