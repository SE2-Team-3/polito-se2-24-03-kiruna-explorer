// Define the Document interface
export interface NewDocument {
  //DocumentID: number;
  Title: string;
  Description: string;
  DocumentType: string; //same thing as scale
  Scale: string;
  NodeType: string;
  Stakeholders: string[];
  CreatedAt: string;
  Language: string;
  Pages: string;
  //Connections: number;
  Georeference: number[][];
}

export interface User {
  Username: string;
}
export interface Props {
  user: User;
  document: NewDocument;
  setDocument: React.Dispatch<React.SetStateAction<NewDocument>>;
}
