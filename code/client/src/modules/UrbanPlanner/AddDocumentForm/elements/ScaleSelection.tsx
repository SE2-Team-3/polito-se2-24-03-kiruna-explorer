import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../../style.css";
import { Props, NewDocument, ScaleProps } from "../interfaces/types";
import API from "../../../../API/API";
import Tick from "../../../../assets/icons/single tick.svg"

const ScaleSelection = (props: ScaleProps) => {

  const [scalesList,setScalesList] = useState<string[]>(props.scalesList)
  const [adding,setAdding] = useState<boolean>(false)
  const [newScale,setNewScale]=useState<string>("")

  const [documentType, setDocumentType] = useState(
    props.props.document ? props.props.document.documentType : ""
  );
  const [scale, setScale] = useState(
    props.props.document ? props.props.document.scale : ""
  );

  const handleTypeChange = (value: string) => {
    if (value=="add") {
      setAdding(true)
    } else {
      setDocumentType(value);
      setScale(value === "Architectural plan" ? "" : value);
    }
  };

  const handleScaleChange = (value: string) => {
    // Concatenate "1:" to the value which is a number and then set it
    if (value) {
      setScale(`1:${value}`);
    } else {
      setScale(""); // Reset if input is empty
    }
  };

  useEffect(() => {
    if (props.props.setDocument) {
      props.props.setDocument((prevDocument: NewDocument) => ({
        ...prevDocument,
        documentType: documentType,
        scale: scale,
      }));
    }
  }, [documentType, scale, props.props.setDocument]);

  const handleAdd = () => {
    handleTypeChange(newScale)
    setAdding(false)
    setScalesList([...scalesList,newScale])
    API.addScale(newScale)
    setNewScale("")
  }

  return (
    <Form.Group as={Col} controlId="formGridScale">
      <Form.Label className="black-text">Scale *</Form.Label>
      {!adding?<InputGroup>
        <Form.Select
          required
          value={documentType}
          style={{ width: "50%" }}
          onChange={(event) => handleTypeChange(event.target.value)}
          className="font-size-20"
        >
          <option value="">Select scale</option>
          {scalesList.map((s)=>(<option value={s}>{s}</option>))}
          <option value="add">Add scale</option>
        </Form.Select>
        {documentType === "Architectural plan" && (
          <>
            <Form.Control
              type="text"
              placeholder="1:"
              value="1:"
              disabled
              style={{ width: "15%", textAlign: "right" }}
              className="mt-0 font-size-20"
            />

            <Form.Control
              required
              type="number"
              placeholder="XXXX"
              value={scale ? scale.split(":")[1] : ""}
              onChange={(event) => handleScaleChange(event.target.value)}
              className="mt-0 font-size-20"
              style={{ width: "30%", textAlign: "left" }}
            />
          </>
        )}
      </InputGroup>:
      <Row>
        <Col>
          <Form.Control
          type="text"
          value={newScale}
          onChange={(event) => setNewScale(event.target.value)}
          placeholder="New scale"
          className="font-size-20"
          onBlur={()=>{
            setNewScale("")
            setAdding(false)
          }}
          />
        </Col>
        <Col style={{maxWidth:"fit-content"}}>
          <img src={Tick} style={{height:"20px"}} onClick={()=>handleAdd()}/>
        </Col>
      </Row>}
    </Form.Group>
  );
};

export default ScaleSelection;
