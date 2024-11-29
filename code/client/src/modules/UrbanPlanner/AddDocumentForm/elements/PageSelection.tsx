import { Col, Form, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../../style.css";
import { Props, NewDocument } from "../interfaces/types";

const PageSelection = (props: Props) => {
  const [pages, setPages] = useState(
    props.document ? props.document.pages : ""
  );
  const [pagesError, setPagesError] = useState("");

  const validatePages = (input: string) => {
    if (input === "") {
      setPagesError("");
      return true;
    }

    const pagesRegex = /^(\d+(-\d+)?)$/;

    if (!pagesRegex.test(input)) {
      setPagesError(
        "Pages must be a number, a range (e.g., '5' or '3-7'), or empty."
      );
      return false;
    }

    setPagesError("");
    return true;
  };

  const handlePagesChange = (value: string) => {
    setPages(value);
    validatePages(value);
  };

  useEffect(() => {
    if (props.setDocument && validatePages(pages)) {
      props.setDocument((prevDocument: NewDocument) => ({
        ...prevDocument,
        pages: pages,
      }));
    }
  }, [pages, props.setDocument]);

  return (
    <Form.Group as={Col} controlId="formGridPages" className="pages-col">
      <Form.Label className="black-text">Pages</Form.Label>
      <Form.Control
        type="text"
        value={pages}
        onChange={(event) => handlePagesChange(event.target.value)}
        placeholder="Enter number, range (e.g., '5' or '3-7'), or leave blank"
        className="font-size-20"
        isInvalid={!!pagesError}
      />
      {pagesError && (
        <Alert variant="danger" className="my-2">
          {pagesError}
        </Alert>
      )}
    </Form.Group>
  );
};

export default PageSelection;
