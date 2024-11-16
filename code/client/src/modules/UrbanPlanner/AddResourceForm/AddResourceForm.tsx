import { FormEvent, useEffect, useState } from "react";
import API from "../../../API/API";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AddResourceForm() {
  const navigate = useNavigate();
  const [resources, setResources] = useState<File[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (true) {
      API.uploadResource(resources).then(() => {
        alert("Done")
        console.log(resources)
        //navigate("/urban-planner");
      });
    } else {
      alert("RIOT FIX THE GAME");
    }
  };

  const handleCancel = () => {

    navigate("/urban-planner");
  };

  const resrecorder=(val:FileList|null) =>{
    if (val===null) return
    setResources([...resources,...val])
  }

  return (
    <div className="main-page">
      <Form className="document-form" onSubmit={handleSubmit} noValidate>
        <Row className="form-title">Upload resources</Row>
        <Form.Label>Multiple upload</Form.Label>
            <input type="file" multiple onChange={(event)=>resrecorder(event.target.files)}/>
        <Button type="submit">OK</Button>
      </Form>
    </div>
  );
}