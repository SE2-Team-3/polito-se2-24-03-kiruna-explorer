import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Diagram from "./pages/Diagram";
import Diagram2 from "./pages/Diagram2"

function App() {
  return (
      <Routes>
        <Route path="/diagram" element={<Diagram />} />
        <Route path='/diagram2' element={ <Diagram2 />}/>
      </Routes>
  );
}

export default App;
