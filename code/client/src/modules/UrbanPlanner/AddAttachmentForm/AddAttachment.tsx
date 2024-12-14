import { FormEvent, useState } from "react";
import API from "../../../API/API";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { useSidebar } from "../../../components/SidebarContext";
import "../../style.css";
import Close from "../../../assets/icons/close.svg";
import Tick from "../../../assets/icons/single tick.svg";
import { CgAttachment } from "react-icons/cg";
import { useToast } from "../../ToastProvider";

export default function AddAttachment(props: any) {
  const navigate = useNavigate();
  const [attachments, setAttachments] = useState<File[]>([]);
  const { isSidebarOpen } = useSidebar();

  const showToast = useToast();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (attachments.length) {
      API.uploadAttachments(props.documentId, attachments).then(() => {
        navigate("/urban-planner/documents-list");
        showToast("Attachment(s) uploaded successfully", "", false);
      });
    } else {
      showToast("Upload at least one attachment", "", true);
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
      if (attachments.find((r) => r.name == v.name)) {
        showToast(
          "One of the files is already present in the selected ones",
          "",
          true
        );
        return;
      }
    }
    setAttachments([...attachments, ...val]);
  };

  const handleRemove = (name: string) => {
    const updatedAttachments = attachments.filter((att) => att.name !== name);
    setAttachments(updatedAttachments);
  };

  return (
    <div className={`main-page ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <Form
        className="form-container document-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <Row className="form-title">Upload attachment</Row>
        <Row style={{ margin: 0 }}>
          <Dropzone
            onDrop={(acceptedFiles: File[]) => handleSelect(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="drop-zone">
                <input {...getInputProps()} />
                <CgAttachment color="#3D52A0" size={30} />
                <div>
                  Drag and Drop or <u className="choose-file">Choose file</u>
                </div>
              </div>
            )}
          </Dropzone>
        </Row>

        <div>
          {attachments.length
            ? attachments.map((res) => {
                return (
                  <Row key={res.name} className="uploaded-doc-row">
                    <Col style={{ maxWidth: "fit-content" }}>
                      <img src={Tick} />
                    </Col>
                    <Col style={{ overflow: "hidden" }}>
                      <p className="uploaded-doc-name">{res.name}</p>
                    </Col>
                    <Col style={{ maxWidth: "fit-content" }}>
                      <img
                        src={Close}
                        onClick={() => handleRemove(res.name)}
                        role="button"
                      />
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
