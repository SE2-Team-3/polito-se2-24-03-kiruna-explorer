import { Row, Button } from "react-bootstrap";
import StakeholderSelection from "../elements/StakeholderSelection";
import ScaleSelection from "../elements/ScaleSelection";
import NodeType from "../elements/NodeType";
import DateSelection from "../elements/DateSelection";
import { Props } from "../interfaces/types";
import { useToast } from "../../../ToastProvider";
import GeoreferenceTypeSelection from "../elements/Georeference/GeoreferenceTypeSelection";

interface StepTwoProps {
  document: Props["document"];
  setDocument: Props["setDocument"];
  stakeholderSelectionRef: React.Ref<any>;
  onBack: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const StepTwo = ({
  document,
  setDocument,
  stakeholderSelectionRef,
  onBack,
  onSubmit,
}: StepTwoProps) => {
  const showToast = useToast();

  const validateForm = (): boolean => {
    if (!document.stakeholders || document.stakeholders.length === 0) {
      showToast("Validation Error", "Stakeholders are required.", true);
      return false;
    }
    if (!document.scale || document.scale.trim() === "") {
      showToast("Validation Error", "Scale is required.", true);
      return false;
    }
    if (!document.nodeType || document.nodeType.trim() === "") {
      showToast("Validation Error", "Node Type is required.", true);
      return false;
    }
    return true;
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <StakeholderSelection
          ref={stakeholderSelectionRef}
          document={document}
          setDocument={setDocument}
        />
        <ScaleSelection document={document} setDocument={setDocument} />
        <NodeType document={document} setDocument={setDocument} />
        <DateSelection document={document} setDocument={setDocument} />
        <GeoreferenceTypeSelection
          document={document}
          setDocument={setDocument}
        />
        <Row className="row-box-button">
          <Button onClick={onBack} className="button-white mt-3 me-3">
            Back
          </Button>
          <Button
            type="submit"
            onClick={validateForm}
            className="button-blue mt-3"
          >
            Submit
          </Button>
        </Row>
      </form>
    </>
  );
};

export default StepTwo;
