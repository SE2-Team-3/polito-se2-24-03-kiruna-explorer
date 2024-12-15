import { FormEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Dropzone from "react-dropzone";
import "../../style.css";
import CloseIcon from "../../../assets/icons/close.svg";
import TickIcon from "../../../assets/icons/single tick.svg";
import { useSidebar } from "../../../components/SidebarContext";
import { useNavigate } from "react-router-dom";

interface FileUploadProps {
  title: string;
  uploadFunction: (documentId: number, files: File[]) => Promise<void>;
  documentId: number;
  showToast: (message: string, description: string, isError: boolean) => void;
  customIcon: JSX.Element;
}

export default function FileUpload({
  title,
  uploadFunction,
  documentId,
  showToast,
  customIcon,
}: FileUploadProps) {
  const navigate = useNavigate();

  const { isSidebarOpen } = useSidebar();
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (files.length) {
      uploadFunction(documentId, files).then(() => {
        navigate("/urban-planner/documents-list");
        showToast("File(s) uploaded successfully", "", false);
      });
    } else {
      showToast("Upload at least one file", "", true);
    }
  };

  const handleCancel = () => {
    navigate("/urban-planner/documents-list");
  };

  const handleSelect = (val: FileList | File[] | null) => {
    if (!val) return;

    for (const file of val) {
      if (files.find((f) => f.name === file.name)) {
        showToast(
          "One of the files is already present in the selection",
          "",
          true
        );
        return;
      }
    }

    setFiles([...files, ...val]);
  };

  const handleRemove = (name: string) => {
    const updatedFiles = files.filter((file) => file.name !== name);
    setFiles(updatedFiles);
  };

  return (
    <div className={`main-page ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <Form
        className="form-container document-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <Row className="form-title">{title}</Row>
        <Row style={{ margin: 0 }}>
          <Dropzone
            onDrop={(acceptedFiles: File[]) => handleSelect(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="drop-zone">
                <input {...getInputProps()} />
                {customIcon}
                <div>
                  Drag and Drop or <u className="choose-file">Choose file</u>
                </div>
              </div>
            )}
          </Dropzone>
        </Row>

        <div>
          {files.map((file) => (
            <Row key={file.name} className="uploaded-doc-row">
              <Col style={{ maxWidth: "fit-content" }}>
                <img src={TickIcon} alt="Tick icon" />
              </Col>
              <Col style={{ overflow: "hidden" }}>
                <p className="uploaded-doc-name">{file.name}</p>
              </Col>
              <Col style={{ maxWidth: "fit-content" }}>
                <img
                  src={CloseIcon}
                  alt="Close icon"
                  onClick={() => handleRemove(file.name)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      handleRemove(file.name);
                    }
                  }}
                />
              </Col>
            </Row>
          ))}
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
