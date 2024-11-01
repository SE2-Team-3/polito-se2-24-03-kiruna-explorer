import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import LeftSideBar from "./components/LeftSideBar";
import UrbanPlanner from "./modules/UrbanPlanner/components/UrbanPlanner";
import AddDocumentForm from "./modules/UrbanPlanner/components/AddDocumentForm/AddDocumentForm";

function App() {
  return (
    <Container>
      <NavBar />
      <LeftSideBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/urban-planner" element={<UrbanPlanner />} />
        <Route path="/add-document" element={<AddDocumentForm />} />
      </Routes>
    </Container>
  );
}

export default App;
