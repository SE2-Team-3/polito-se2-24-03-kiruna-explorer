// Define the Document interface
export interface NewDocument {
  //DocumentID: number;
  title: string;
  description: string;
  documentType: string; //same thing as scale
  scale: string;
  nodeType: string;
  stakeholders: string[];
  issuanceDate: string;
  language: string;
  pages: string;
  //Connections: number;
  georeference: number[][];
  linkTypes: string[];
}

export interface Props {
  document: NewDocument;
  setDocument: React.Dispatch<React.SetStateAction<NewDocument>>;
}
