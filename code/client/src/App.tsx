import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./modules/GeneralPages/Home";
import NavBar from "./components/NavBar";
import LeftSideBar from "./components/LeftSideBar";
import UrbanPlanner from "./modules/UrbanPlanner/UrbanPlannerDashboard";
import AddDocumentForm from "./modules/UrbanPlanner/AddDocumentForm/AddDocumentForm";
import { NewDocument, User } from "./interfaces/types";

function App() {
  const [newDocument, setNewDocument] = useState<NewDocument>({
    Title: "",
    Description: "",
    DocumentType: "", //same thing as scale
    Scale: "",
    NodeType: "",
    Stakeholders: [],
    CreatedAt: "",
    Language: "",
    Pages: "",
    Georeference: [[]],
  });

  const [user, setUser] = useState<User>({
    Username: "",
  });
  const sara: User = { Username: "Sara" };
  if (user.Username != "Sara") setUser(sara);

  return (
    <Container>
      <NavBar />
      <LeftSideBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/urban-planner" element={<UrbanPlanner />} />
        <Route
          path="/add-document"
          element={
            <AddDocumentForm
              user={user}
              document={newDocument}
              setDocument={setNewDocument}
            />
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
