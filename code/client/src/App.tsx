import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Diagram from "./pages/Diagram";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/diagram" element={<Diagram />} />
      </Routes>
    </Container>
  );
}

export default App;
