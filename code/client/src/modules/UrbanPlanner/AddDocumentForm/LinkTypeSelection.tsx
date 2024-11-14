import { Col, Form, Dropdown } from "react-bootstrap";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import "../../style.css";
import { Props, NewDocument } from "./interfaces/types"; // Assuming 'types' have relevant types for Props and NewDocument

const LinkTypeSelection = forwardRef((props: Props, ref) => {
  const [linkTypes, setLinkTypes] = useState<string[]>(
    props.document ? props.document.linkTypes || [] : []
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [showValidation, setShowValidation] = useState(false);

  const linkTypeList = [
    "Direct consequence",
    "Collateral consequence",
    "Prevision",
    "Update",
  ];

  // Funzione per gestire la selezione/deselezione
  const toggleLinkType = (linkType: string) => {
    setLinkTypes((prevLinkTypes) =>
      prevLinkTypes.includes(linkType)
        ? prevLinkTypes.filter((lt) => lt !== linkType)
        : [...prevLinkTypes, linkType]
    );
  };

  useEffect(() => {
    if (props.setDocument) {
      props.setDocument((prevDocument: NewDocument) => ({
        ...prevDocument,
        linkTypes: linkTypes,
      }));
    }

    setIsValid(linkTypes.length > 0); // Ensure that at least one link type is selected
  }, [linkTypes, props.setDocument]);

  const handleValidationCheck = () => {
    if (!isValid) {
      setShowValidation(true); // Show error only if form is invalid
    }
  };

  // Expose the handleValidationCheck function to the parent
  useImperativeHandle(ref, () => ({
    handleValidationCheck,
  }));

  return (
    <Form.Group as={Col} controlId="formGridLinkType">
      <Form.Label className="font-size-18">Link Types</Form.Label>

      {/* Dropdown Button with Custom Checkbox Options */}
      <Dropdown
        show={isDropdownOpen}
        onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
        className="dropdown"
      >
        <Dropdown.Toggle
          className={`dropdown-toggle w-100 ${
            isValid && showValidation ? "" : "is-invalid"
          }`}
        >
          {linkTypes.length > 0
            ? linkTypes.join(", ")
            : "Select Link Types"}
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu">
          {linkTypeList.map((lt, index) => (
            <Dropdown.Item
              key={index}
              as="div"
              className="dropdown-item"
              onClick={(e) => e.stopPropagation()} // Prevents automatic dropdown close
            >
              <Form.Check
                type="checkbox"
                id={`linkType-${index}`}
                //label={lt}
                label={<span style={{ color: "black" }}>{lt}</span>}
                checked={linkTypes.includes(lt)}
                onChange={() => toggleLinkType(lt)}
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Validation Feedback */}
      {!isValid && showValidation && (
        <div className="invalid-feedback d-block">
          Please select at least one link type.
        </div>
      )}
    </Form.Group>
  );
});

export default LinkTypeSelection;
