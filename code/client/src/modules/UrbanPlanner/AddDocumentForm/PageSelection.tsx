import { Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";

const PageSelection = (props: any) => {
  const [pages, setPages] = useState(props.document ? props.document.Pages : 0);

  useEffect(() => {
    if (props.setDocument) {
      props.setDocument((prevDocument: any) => ({
        ...prevDocument,
        Pages: pages,
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
      />
    </Form.Group>
  );
};

export default PageSelection;
