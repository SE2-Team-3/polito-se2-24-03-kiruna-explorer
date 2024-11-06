import { Form, Row } from "react-bootstrap";

export default function LinkTypeSelector(props: any) {
  const { linkType, setLinkType } = props;

  return (
    <Row className="row-box">
      <Form.Label className="black-text">Link Type *</Form.Label>

      <Form.Check
        type="radio"
        label="Direct consequence"
        name="options"
        value="direct consequence"
        onChange={(event) => setLinkType(event.target.value)}
        className="font-size-20"
      />
      <Form.Check
        type="radio"
        label="Collateral consequence"
        name="options"
        value="collateral consequence"
        onChange={(event) => setLinkType(event.target.value)}
        className="font-size-20"
      />
      <Form.Check
        type="radio"
        label="Prevision"
        name="options"
        value="prevision"
        onChange={(event) => setLinkType(event.target.value)}
        className="font-size-20"
      />
      <Form.Check
        type="radio"
        label="Update"
        name="options"
        value="update"
        onChange={(event) => setLinkType(event.target.value)}
        className="font-size-20"
      />
    </Row>
  );
}
