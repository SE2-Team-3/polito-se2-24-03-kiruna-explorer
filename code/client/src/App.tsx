import { Container } from "react-bootstrap";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./modules/GeneralPages/Home";
import NavBar from "./components/NavBar";
import LeftSideBar from "./components/LeftSideBar";
import UrbanPlanner from "./modules/UrbanPlanner/UrbanPlannerDashboard";
import AddDocumentForm from "./modules/UrbanPlanner/AddDocumentForm/AddDocumentForm";
import { NewDocument } from "./modules/UrbanPlanner/AddDocumentForm/interfaces/types";
import { User, UserContext } from "./components/UserContext";
import API from "./API/API";
import Login from "./modules/GeneralPages/Login";
import LinkDocumentForm from "./modules/UrbanPlanner/LinkDocumentForm/LinkDocumentForm";

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState<Boolean>(true);
  const [loginMessage, setLoginMessage] = useState<String>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  const [newDocument, setNewDocument] = useState<NewDocument>({
    title: "",
    description: "",
    documentType: "", //same thing as scale
    scale: "",
    nodeType: "",
    stakeholders: [],
    issuanceDate: "",
    language: "",
    pages: "",
    georeference: [[]],
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
        navigate("/");
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
          {/* default page is login page */}
          <Route
            path="/"
            element={loggedIn ? <Navigate to="/urban-planner" /> : <Navigate to="/login" />}
          />
          {/* login page */}
          <Route
            path="/login"
            element={<Login login={doLogin} message={loginMessage} setMessage={setLoginMessage} />}
          />
          {/* no login required */}
          <Route path="/home" element={<Home />} />
          {/* urban-planner login required */}
          <Route
            path="/urban-planner"
            element={loggedIn ? <UrbanPlanner /> : <Navigate to="/login" />}
          />
          <Route
            path="/urban-planner/add-document"
            element={
              loggedIn ? (
                <AddDocumentForm document={newDocument} setDocument={setNewDocument} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/urban-planner/link-documents"
            element={loggedIn ? <LinkDocumentForm /> : <Navigate to="/login" />}
          />
        </Routes>
      </UserContext.Provider>
    </Container>
  );
}

export default App;
