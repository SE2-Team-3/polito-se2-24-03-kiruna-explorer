import { Row, Button } from "react-bootstrap";
import StakeholderSelection from "../elements/StakeholderSelection";
import ScaleSelection from "../elements/ScaleSelection";
import NodeType from "../elements/NodeType";
import DateSelection from "../elements/DateSelection";
import { Props } from "../interfaces/types";
import { useToast } from "../../../ToastProvider";
import GeoreferenceTypeSelection from "../elements/Georeference/GeoreferenceTypeSelection";
import { useEffect, useState } from "react";
import API from "../../../../API/API";

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

  const [stakeholdersList,setStakeholdersList] = useState<string[]>([])
  const [scalesList,setScalesList] = useState<string[]>([])
  const [nodeTypesList,setNodeTypesList] = useState<string[]>([])

  useEffect(()=>{
    async function init() {
      API.getStakeholders().then((stakeholders:any)=>{
        setStakeholdersList(stakeholders)
      })
      API.getScales().then((scales:any)=>{
        setScalesList(scales)
      })
      API.getNodeTypes().then((nodeTypes:any)=>{
        setNodeTypesList(nodeTypes)
      })
    }

    if (!stakeholdersList.length) {
      init()
    }
  },[])
  
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
        <Row>
          {stakeholdersList.length &&
          <StakeholderSelection
            ref={stakeholderSelectionRef}
            props={{document:document,setDocument:setDocument}}
            stakeholdersList={stakeholdersList}
          />}
          <DateSelection document={document} setDocument={setDocument} />
        </Row>
        <Row>
          {scalesList.length &&
          <ScaleSelection props={{document:document,setDocument:setDocument}} scalesList={scalesList}/>}
          {nodeTypesList.length &&
          <NodeType props={{document:document,setDocument:setDocument}} nodeTypesList={nodeTypesList}/>}
        </Row>
        <Row>
          <GeoreferenceTypeSelection document={document} setDocument={setDocument} />
        </Row>
        <Row className="row-box-button">
          <Button onClick={onBack} className="button-white mt-3 me-3">
            Back
          </Button>
          <Button type="submit" onClick={validateForm} className="button-blue mt-3">
            Submit
          </Button>
        </Row>
      </form>
    </>
  );
};

export default StepTwo;
