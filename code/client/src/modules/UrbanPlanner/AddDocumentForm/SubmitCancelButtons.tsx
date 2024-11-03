import { Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../style.css";
import { Props, NewDocument } from "../../../interfaces/types";

const SubmitCancelButtons = (props: Props) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleCancel = () => {
    const resetDoc: NewDocument = {
      Title: "",
      Description: "",
      DocumentType: "", //same thing as scale
      Scale: "",
      NodeType: "",
      Stakeholders: [],
      CreatedAt: "",
      Language: "",
      Pages: "",
      Georeference: [[]],
    };

    props.setDocument(resetDoc);
    navigate("/urban-planner"); // Redirect to /urban-planner
  };

  return (
    <Row className="row-box">
      <Col className="col-box">
        <Button type="submit" className="button-white float-end ms-2">
          Submit
        </Button>
        <Button
          variant="primary"
          className="button-white float-end"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Col>
    </Row>
  );
};

export default SubmitCancelButtons;
