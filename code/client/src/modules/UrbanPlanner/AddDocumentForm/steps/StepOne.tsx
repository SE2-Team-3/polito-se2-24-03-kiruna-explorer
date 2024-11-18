import { Row, Button, Alert } from "react-bootstrap";
import DocumentDetails from "../elements/DocumentDetails";
import PageSelection from "../elements/PageSelection";
import LanguageSelection from "../elements/LanguageSelection";
import { Props } from "../interfaces/types";
import { useToast } from "../../../ToastProvider";

interface StepOneProps {
  document: Props["document"];
  setDocument: Props["setDocument"];
  onNext: () => void;
  onCancel: () => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
}

const StepOne = ({
  document,
  setDocument,
  onNext,
  onCancel,
  errorMessage,
  setErrorMessage,
}: StepOneProps) => {
  const showToast = useToast();

  const handleNext = () => {
    if (document.title && document.description) {
      setErrorMessage("");
      onNext();
    } else {
      showToast("Please fill in both Title and Description.", "", true);
    }
  };

  return (
    <>
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      <DocumentDetails document={document} setDocument={setDocument} />
      <Row className="row-box">
        <PageSelection document={document} setDocument={setDocument} />
        <LanguageSelection document={document} setDocument={setDocument} />
      </Row>
      <Row className="row-box-button">
        <Button onClick={onCancel} className="button-white mt-3 me-3">
          Cancel
        </Button>
        <Button onClick={handleNext} className="button-blue mt-3">
          Next
        </Button>
      </Row>
    </>
  );
};

export default StepOne;
