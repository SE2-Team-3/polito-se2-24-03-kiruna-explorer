import { Container } from "react-bootstrap";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./modules/GeneralPages/Home";
import NavBar from "./components/NavBar";
import LeftSideBar from "./components/LeftSideBar";
import UrbanPlanner from "./modules/UrbanPlanner/UrbanPlannerDashboard";
import AddDocumentForm from "./modules/UrbanPlanner/AddDocumentForm/AddDocumentForm";
import { NewDocument } from "./interfaces/types";
import { User, UserContext } from "./components/UserContext";
import API from "./API/API";
import Login from "./modules/GeneralPages/Login";

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState<Boolean>(true);
  const [loginMessage, setLoginMessage] = useState<String>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const u = await API.getUserInfo();
        console.log(u);
        setUser(new User(u.username, u.name, u.surname));
        setLoggedIn(true);
        setIsLoaded(true);
        navigate("/");
      } catch {
        setLoggedIn(false);
        setUser(undefined);
        setIsLoaded(true);
      }
    };

    checkAuth();
  }, []);

  const doLogin = function (username: string, password: string) {
    API.login(username, password)
      .then((u: User) => {
        setLoggedIn(true);
        setUser(new User(u.username, u.name, u.surname));
        setIsLoaded(true);
        navigate("/urban-planner");
      })
      .catch((err) => {
        console.log(typeof err);
        setLoginMessage(
          err.error
            ? err.error
            : err.message
            ? err.message
            : typeof err === "string"
            ? err
            : "An error occurred"
        );
      });
  };

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser(undefined);
    setIsLoaded(false);
    navigate("/");
  };

  return (
    <Container>
      <UserContext.Provider value={user}>
        <NavBar />
        <LeftSideBar logout={doLogOut} />
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/urban-planner" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              <Login
                login={doLogin}
                message={loginMessage}
                setMessage={setLoginMessage}
              />
            }
          />
          <Route
            path="/home"
            element={loggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/urban-planner" element={<UrbanPlanner />} />
          <Route
            path="/add-document"
            element={
              <AddDocumentForm
                document={newDocument}
                setDocument={setNewDocument}
              />
            }
          />
        </Routes>
      </UserContext.Provider>
    </Container>
  );
}

export default App;
