import API from "../../../API/API";
import { useToast } from "../../ToastProvider";
import FileUpload from "./FileUpload";
import UploadDocumentIcon from "../../../assets/icons/upload document.svg";

export default function AddResourceForm(props: any) {
  const showToast = useToast();

  return (
    <FileUpload
      title="Upload resources"
      uploadFunction={API.uploadResources}
      documentId={props.documentId}
      showToast={showToast}
      customIcon={<img src={UploadDocumentIcon} alt="Upload icon" />}
    />
  );
}
