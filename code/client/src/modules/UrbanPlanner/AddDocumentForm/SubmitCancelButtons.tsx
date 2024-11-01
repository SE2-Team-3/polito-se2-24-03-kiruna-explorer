import { Col, Row, Button } from "react-bootstrap";
import "../../style.css";

const SubmitCancelButtons = () => {
  return (
    <Row className="row-box">
      <Col className="col-box"></Col>
      <Col className="col-box">
        <Button type="submit" className="button-white float-end ms-2">
          Submit
        </Button>
        <Button variant="primary" className="button-white float-end">
          Cancel
        </Button>
      </Col>
    </Row>
  );
};

export default SubmitCancelButtons;
