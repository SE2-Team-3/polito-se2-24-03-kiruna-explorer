import { Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";
import { Props, NewDocument } from "./interfaces/types";

const PageSelection = (props: Props) => {
  const [pages, setPages] = useState(
    props.document ? props.document.pages : ""
  );

  useEffect(() => {
    if (props.setDocument) {
      props.setDocument((prevDocument: NewDocument) => ({
        ...prevDocument,
        pages: pages,
      }));
    }
  }, [pages, props.setDocument]);

  return (
    <Form.Group as={Col} controlId="formGridPages">
      <Form.Label className="black-text">Pages</Form.Label>
      <Form.Control
        type="text"
        value={pages}
        onChange={(event) => setPages(event.target.value)}
        placeholder="Number of pages"
        className="font-size-20"
      />
    </Form.Group>
  );
};

export default PageSelection;
