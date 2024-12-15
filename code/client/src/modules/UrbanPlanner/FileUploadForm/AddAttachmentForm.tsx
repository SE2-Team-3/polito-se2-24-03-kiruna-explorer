import API from "../../../API/API";
import { useToast } from "../../ToastProvider";
import FileUpload from "./FileUpload";
import Attachment from "../../../assets/icons/attachment.svg";

export default function AddAttachmentForm(props: any) {
  const showToast = useToast();

  return (
    <FileUpload
      title="Upload attachment"
      uploadFunction={API.uploadAttachments}
      documentId={props.documentId}
      showToast={showToast}
      customIcon={<img src={Attachment} alt="Attachment icon" />}
    />
  );
}
