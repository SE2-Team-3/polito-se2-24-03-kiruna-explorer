import { FormEvent, useEffect, useState } from "react";
import API from "../../../API/API";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import "../../style.css"

export default function AddResourceForm() {
  const navigate = useNavigate();
  const [resources, setResources] = useState<File[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (resources.length) {
      API.uploadResource(resources).then(() => {
        alert("Done")
        //navigate("/urban-planner");
      });
    } else {
      alert("Upload at least one resource");
    }
  };

  const handleCancel = () => {
    //this should be enough
    navigate("/urban-planner");
  };

  const handleSelect=(val:FileList|File[]|null) =>{
    if (val===null) return
    for (const v of val) {
      //implement better search for duplicates, this doesn't account for different files with same name
      if (resources.find(r=>r.name==v.name)) {
        alert("One of the files is already present in the selected ones")
        return
      }
    }
    setResources([...resources,...val])
  }

  const handleRemove=(name:string)=>{
    const newRes=resources.filter(r=>r.name!==name)
    setResources(newRes)
  }

  return (
    <div className="main-page">
      <Form className="document-form" onSubmit={handleSubmit} noValidate>
        <Row className="form-title">Upload resources</Row>
        <Row>
            <Dropzone onDrop={(acceptedFiles:File[])=>handleSelect(acceptedFiles)}>
              {({getRootProps, getInputProps})=>(
                  <div {...getRootProps()}>
                    <input {...getInputProps()}/>
                    <div className="drop-zone">Drag and drop or click to browse</div>
                  </div>
                )}
            </Dropzone>
        </Row>

        {
        resources.length? (
          resources.map((res)=>{
            return (
            <Row key={res.name}>
              <Col>
                <p>{res.name}</p>
              </Col>
              <Col>
                <Button onClick={()=>handleRemove(res.name)}>Delete</Button>
              </Col>
            </Row>
          )
          })
        ):null}

        <Row className="row-box-button">
          <Button onClick={handleCancel} className="button-white mt-3 me-3">
            Cancel
          </Button>
          <Button type="submit" className="button-blue mt-3">
            Next
          </Button>
        </Row>
      </Form>
    </div>
  );
}