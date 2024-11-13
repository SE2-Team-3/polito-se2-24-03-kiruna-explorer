import { Row, Form, Button, Alert } from "react-bootstrap";
import { useState, FormEvent } from "react";
import "../../style.css";
import { useNavigate } from "react-router-dom";
import API from "../../../API/API";
import { useToast } from "../../ToastProvider";
import { FaCheck } from "react-icons/fa";

interface MultipleLinkFormProps {
  newDocID: number;
}

const MultipleLinkForm = (props: MultipleLinkFormProps) => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const [currentStep, setCurrentStep] = useState(3);

  const showToast = useToast();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    /* handle submit link form*/
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget as HTMLFormElement;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      /*call api to link document in db*/
      setErrorMessage("");
      showToast("Document link successfully!", "");
    }
  };

  const handleCancel = () => {
    /*go back to urban-planner dashboard*/
    navigate("/urban-planner");
  };

  return (
    <>
      <Form
        className="multiple-link-form"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        {errorMessage && (
          <Alert
            variant="danger"
            onClose={() => setErrorMessage("")}
            dismissible
          >
            {errorMessage}
          </Alert>
        )}
        {currentStep === 3 && (
          <>
            <div>ADD LINK HERE</div>
            <Row className="row-box-button">
              <Button onClick={handleCancel} className="button-white mt-3 me-3">
                Cancel
              </Button>
              <Button type="submit" className="button-blue mt-3">
                Submit
              </Button>
            </Row>
          </>
        )}
      </Form>
    </>
  );
};

export default MultipleLinkForm;
