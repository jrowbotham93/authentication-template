import "./App.css";
import { lazy } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./AuthenticationProvider";

const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"));
const UnAuthenticatedApp = lazy(() => import("./UnAuthenticatedApp"));

function App() {
  const { user } = useAuth();
  return (
    <Router>{user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}</Router>
  );
}

export default App;
