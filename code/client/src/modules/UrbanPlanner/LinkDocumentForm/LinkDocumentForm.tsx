import { useEffect, useState } from "react";
import Document from "../../../models/document";
import API from "../../../API/API";

export default function LinkDocumentForm() {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {}, []);

  return (
    <form>
      <input type="text" placeholder="Document ID" />
      <button type="submit">Link Document</button>
    </form>
  );
}
