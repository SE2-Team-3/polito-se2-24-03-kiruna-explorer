import { Col, Form, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";

const ScaleSelection = (props: any) => {
  const [scale, setScale] = useState(
    props.document ? props.document.Scale : ""
  );
  const [customScale, setCustomScale] = useState("");

  const handleScaleChange = (value: any) => {
    setScale(value);

    // Reset the custom scale if a different scale is selected
    if (value !== "Plan") {
      setCustomScale("");
    }
  };

  useEffect(() => {
    if (props.setDocument) {
      props.setDocument((prevDocument: any) => ({
        ...prevDocument,
        Scale: scale === "Plan" ? customScale : scale,
      }));
    }
    console.log(props.document.Scale);
  }, [scale, customScale, props.setDocument]);

  return (
    <Form.Group as={Col} controlId="formGridScale">
      <Form.Label className="black-text">Scale</Form.Label>
      <InputGroup>
        <Form.Select
          required
          value={scale}
          onChange={(event) => handleScaleChange(event.target.value)}
          className="font-size-20"
        >
          <option value="">Select scale</option>
          <option value="Text">Text</option>
          <option value="Concept">Concept</option>
          <option value="Plan">Plan</option>
          <option value="Actions">Blueprints/actions</option>
        </Form.Select>
        {scale === "Plan" && (
          <Form.Control
            required
            type="text"
            placeholder="Enter scale in 1:xxx format"
            value={customScale}
            style={{ width: "60%" }}
            onChange={(event) => setCustomScale(event.target.value)}
            className="mt-0 font-size-20"
          />
        )}
      </InputGroup>
    </Form.Group>
  );
};

export default ScaleSelection;
