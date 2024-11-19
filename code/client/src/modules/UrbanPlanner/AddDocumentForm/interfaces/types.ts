// Define the Document interface
export interface NewDocument {
  title: string;
  description: string;
  documentType: string; //same thing as scale
  scale: string;
  nodeType: string;
  stakeholders: string[];
  issuanceDate: string;
  language: string;
  pages: string;
  georeference: number[][] | null;
}

export interface Props {
  document: NewDocument;
  setDocument: React.Dispatch<React.SetStateAction<NewDocument>>;
}
