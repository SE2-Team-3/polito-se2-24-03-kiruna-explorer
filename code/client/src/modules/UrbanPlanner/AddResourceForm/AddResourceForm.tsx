import { FormEvent, useState } from "react";
import API from "../../../API/API";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { useSidebar } from "../../../components/SidebarContext";
import "../../style.css";
import Close from "../../../assets/icons/close.svg";
import Tick from "../../../assets/icons/single tick.svg";
import UploadDocument from "../../../assets/icons/upload document.svg";
import { useToast } from "../../ToastProvider";

export default function AddResourceForm(props: any) {
  const navigate = useNavigate();
  const [resources, setResources] = useState<File[]>([]);
  const { isSidebarOpen } = useSidebar();

  const showToast = useToast();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (resources.length) {
      API.uploadResources(props.documentId, resources).then(() => {
        navigate("/urban-planner/documents-list");
        showToast("Resource(s) uploaded successfully", "", false);
      });
    } else {
      showToast("Upload at least one resource", "", true);
    }
  };

  const handleCancel = () => {
    //this should be enough
    //props.setUploadDocumentId(undefined);
    navigate("/urban-planner/documents-list");
  };

  const handleSelect = (val: FileList | File[] | null) => {
    if (val === null) return;
    for (const v of val) {
      //implement better search for duplicates, this doesn't account for different files with same name
      if (resources.find((r) => r.name == v.name)) {
        showToast("One of the files is already present in the selected ones", "", true);
        return;
      }
    }
    setResources([...resources, ...val]);
  };

  const handleRemove = (name: string) => {
    const newRes = resources.filter((r) => r.name !== name);
    setResources(newRes);
  };
  console.log(props.documentId);
  return (
    <div className={`main-page ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <Form className="form-container document-form" onSubmit={handleSubmit} noValidate>
        <Row className="form-title">Upload resources</Row>
        <Row style={{ margin: 0 }}>
          <Dropzone onDrop={(acceptedFiles: File[]) => handleSelect(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="drop-zone">
                <input {...getInputProps()} />
                <img src={UploadDocument} />
                <div>
                  Drag and Drop or{" "}
                  <u className="choose-file">Choose file</u>
                </div>
              </div>
            )}
          </Dropzone>
        </Row>

        <div>
          {resources.length
            ? resources.map((res) => {
                return (
                  <Row key={res.name} className="uploaded-doc-row">
                    <Col style={{maxWidth:"fit-content"}}>
                      <img src={Tick}/>
                    </Col>
                    <Col style={{overflow:"hidden"}}>
                      <p className="uploaded-doc-name">{res.name}</p>
                    </Col>
                    <Col style={{maxWidth:"fit-content"}}>
                      <img src={Close} onClick={() => handleRemove(res.name)} role="button" />
                    </Col>
                  </Row>
                );
              })
            : null}
        </div>

        <Row className="row-box-button">
          <Button onClick={handleCancel} className="button-white mt-3 me-3">
            Cancel
          </Button>
          <Button type="submit" className="button-blue mt-3">
            Upload
          </Button>
        </Row>
      </Form>
    </div>
  );
}
