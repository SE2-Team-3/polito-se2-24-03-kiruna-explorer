import { useParams } from "react-router-dom";
import { useSidebar } from "../../components/SidebarContext";

const DocumentDetails = () => {
  const { isSidebarOpen } = useSidebar();
  const { documentId } = useParams();

  return (
    <div className={`document-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <h1>Document Details for {documentId}</h1>
    </div>
  );
};

export default DocumentDetails;
