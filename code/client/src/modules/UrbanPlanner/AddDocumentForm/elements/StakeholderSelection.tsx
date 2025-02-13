import { Row, Col, Form, Dropdown } from "react-bootstrap";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import "../../../style.css";
import { NewDocument, StakeholderProps } from "../interfaces/types";
import API from "../../../../API/API";
import Tick from "../../../../assets/icons/single tick.svg"
import Cancel from "../../../../assets/icons/close.svg"

const StakeholderSelection = forwardRef((props: StakeholderProps, ref) => {

  const [stakeholdersList,setStakeholdersList] = useState<string[]>(props.stakeholdersList)
  const [adding,setAdding] = useState<boolean>(false)
  const [newStakeholder,setNewStakeholder]=useState<string>("")

  const [stakeholders, setStakeholders] = useState<string[]>(
    props.props.document ? props.props.document.stakeholders : []
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [showValidation, setShowValidation] = useState(false);

  // Funzione per gestire la selezione/deselezione
  const toggleStakeholder = (stakeholder: string) => {
    setStakeholders((prevStakeholders) =>
      prevStakeholders.includes(stakeholder)
        ? prevStakeholders.filter((s) => s !== stakeholder)
        : [...prevStakeholders, stakeholder]
    );
  };

  useEffect(() => {
    if (props.props.setDocument) {
      props.props.setDocument((prevDocument: NewDocument) => ({
        ...prevDocument,
        stakeholders: stakeholders,
      }));
    }

    setIsValid(stakeholders.length > 0);
  }, [stakeholders, props.props.setDocument]);

  const handleValidationCheck = () => {
    if (!isValid) {
      setShowValidation(true); // Show error only if form is invalid
    }
  };

  // Expose the handleValidationCheck function to the parent
  useImperativeHandle(ref, () => ({
    handleValidationCheck,
  }));
  
  const handleAdd = () => {
    toggleStakeholder(newStakeholder)
    setAdding(false)
    setStakeholdersList([...stakeholdersList,newStakeholder])
    API.addStakeholder(newStakeholder)
    setNewStakeholder("")
  }

  const handleCancel = () => {
    setNewStakeholder("")
    setAdding(false)
  }

  return (
    <Form.Group as={Col} controlId="formGridSH">
      <Form.Label className="black-text">Stakeholders *</Form.Label>

      {/* Dropdown Button with Custom Checkbox Options */}
      {!adding?<Dropdown
        show={isDropdownOpen}
        onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
        className="dropdown"
      >
        <Dropdown.Toggle
          className={`dropdown-toggle w-100 font-size-20 ${
            isValid && showValidation ? "" : "is-invalid"
          }`}
        >
          {stakeholders.length > 0
            ? stakeholders.join(", ")
            : "Select Stakeholders"}
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu">
          {stakeholdersList.map((sh, index) => (
            <Dropdown.Item
              key={index}
              as="div"
              className="dropdown-item"
              onClick={(e) => e.stopPropagation()} // Previene la chiusura automatica
            >
              <Form.Check
                type="checkbox"
                id={`stakeholder-${index}`}
                label={sh}
                checked={stakeholders.includes(sh)}
                onChange={() => toggleStakeholder(sh)}
                className="form-check-label"
              />
            </Dropdown.Item>
          ))}
          <Dropdown.Item
            key="add"
            as="div"
            role="button"
            className="dropdown-item"
            onClick={()=>setAdding(true)}>
            Add stakeholder
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>:
      <Row style={{alignItems:"center"}}>
        <Col style={{maxWidth:"fit-content",padding:"0"}}>
          <input type="image" alt="Cancel" src={Cancel} style={{width:"40px"}} onClick={()=>handleCancel()}/>
        </Col>
        <Col style={{paddingLeft:"0"}}>
          <Form.Control
          type="text"
          value={newStakeholder}
          onChange={(event) => setNewStakeholder(event.target.value)}
          placeholder="New stakeholder"
          className="font-size-20"
          />
        </Col>
        <Col style={{maxWidth:"fit-content",padding:"0"}}>
          <input type="image" alt="Confirm" src={Tick} style={{width:"20px"}} onClick={()=>handleAdd()}/>
        </Col>
      </Row>}

      {/* Validation Feedback */}
      {!isValid && showValidation && (
        <div className="invalid-feedback d-block">
          Please select at least one stakeholder.
        </div>
      )}
    </Form.Group>
  );
});

export default StakeholderSelection;
