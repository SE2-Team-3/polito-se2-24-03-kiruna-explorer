import { Form, Row } from "react-bootstrap";

export default function LinkTypeSelector({ linkType, setLinkType }: any) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    // Update the linkType state by adding or removing the selected value
    if (isChecked) {
      setLinkType((prev: string[]) => [...prev, value]);
    } else {
      setLinkType((prev: string[]) => prev.filter((item) => item !== value));
    }
  };

  return (
    <Row className="row-box">
      <Form.Label className="black-text">Link Type *</Form.Label>

      {/* Direct consequence checkbox */}
      <Form.Check
        type="checkbox"
        label="Direct consequence"
        value="direct consequence"
        checked={linkType.includes("direct consequence")}
        onChange={handleChange}
        className="font-size-20"
      />

      {/* Collateral consequence checkbox */}
      <Form.Check
        type="checkbox"
        label="Collateral consequence"
        value="collateral consequence"
        checked={linkType.includes("collateral consequence")}
        onChange={handleChange}
        className="font-size-20"
      />

      {/* Prevision checkbox */}
      <Form.Check
        type="checkbox"
        label="Prevision"
        value="prevision"
        checked={linkType.includes("prevision")}
        onChange={handleChange}
        className="font-size-20"
      />

      {/* Update checkbox */}
      <Form.Check
        type="checkbox"
        label="Update"
        value="update"
        checked={linkType.includes("update")}
        onChange={handleChange}
        className="font-size-20"
      />
    </Row>
  );
}
