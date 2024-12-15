import { Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../../style.css";
import { NewDocument, NodeTypeProps } from "../interfaces/types";
import API from "../../../../API/API";
import Tick from "../../../../assets/icons/single tick.svg"
import Cancel from "../../../../assets/icons/close.svg"

const NodeType = (props: NodeTypeProps) => {
  const [nodeType, setNodeType] = useState(
    props.props.document ? props.props.document.nodeType : ""
  );

  const [nodeTypesList,setNodeTypesList] = useState<string[]>(props.nodeTypesList)
  const [adding,setAdding] = useState<boolean>(false)
  const [newNodeType,setNewNodeType]=useState<string>("")

  useEffect(() => {
    if (props.props.setDocument) {
      props.props.setDocument((prevDocument: NewDocument) => ({
        ...prevDocument,
        nodeType: nodeType,
      }));
    }
  }, [nodeType, props.props.setDocument]);

  const handleAdd = () => {
    setNodeType(newNodeType)
    setAdding(false)
    setNodeTypesList([...nodeTypesList,newNodeType])
    API.addNodeType(newNodeType)
    setNewNodeType("")
  }

  const handleCancel = () => {
    setNewNodeType("")
    setAdding(false)
  }

  return (
    <Form.Group as={Col} controlId="formGridDocType">
      <Form.Label className="black-text">Document Type *</Form.Label>
      {!adding?<Form.Select
        required
        value={nodeType}
        onChange={(event) => {
          if (event.target.value=="add") {
            setAdding(true)
          } else {
            setNodeType(event.target.value)
          }
        }}
        className="font-size-20"
      >
        <option value="">Select document type</option>
        {nodeTypesList.map((n,index)=>(<option key={index} value={n}>{n}</option>))}
        <option value="add">
              Add document type
          </option>
      </Form.Select>:
      <Row style={{alignItems:"center"}}>
        <Col style={{maxWidth:"fit-content",padding:"0"}}>
          <img src={Cancel} style={{width:"40px"}} onClick={()=>handleCancel()}/>
        </Col>
        <Col style={{paddingLeft:"0"}}>
          <Form.Control
          type="text"
          value={newNodeType}
          onChange={(event) => setNewNodeType(event.target.value)}
          placeholder="New document type"
          className="font-size-20"
          />
        </Col>
        <Col style={{maxWidth:"fit-content",padding:"0"}}>
          <img src={Tick} style={{width:"20px"}} onClick={()=>handleAdd()}/>
        </Col>
      </Row>}
      <Form.Control.Feedback type="invalid">
        Please select a document type
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default NodeType;
