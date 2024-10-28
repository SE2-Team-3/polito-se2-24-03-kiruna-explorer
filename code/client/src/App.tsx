import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import UrbanPlanner from "./modules/UrbanPlanner/components/UrbanPlanner";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/urban-planner" element={<UrbanPlanner />} />
      </Routes>
    </Container>
  );
}

export default App;
