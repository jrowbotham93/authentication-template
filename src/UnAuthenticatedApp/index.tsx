import { useState } from "react";
import type { RouteObject } from "react-router-dom";
import {
  Outlet,
  Location,
  useLocation,
  useRoutes,
  useNavigate,
  Link,
} from "react-router-dom";

import { useAuth } from "../AuthenticationProvider";

const Layout = () => {
  return (
    <>
      <header>Logo</header>
      <main>
        <Outlet />
      </main>
      <Link to="/login">Login</Link>
      <footer>Footer</footer>
    </>
  );
};

const Login = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const location = (useLocation() as unknown) as LocationProps;
  const [credentials, setCredentials] = useState("");
  type LocationProps = {
    state: {
      from: Location;
    };
  };

  const handleSubmit = () => {
    signin(credentials, () => {
      navigate(location.state?.from?.pathname || "/", {
        replace: true,
      });
    });
  };
  return (
    <div>
      <input type="text" onChange={(e) => setCredentials(e.target.value)} />
      {credentials.length > 1 && <button onClick={handleSubmit}>Login</button>}
    </div>
  );
};
const Register = () => {
  return <div>Register</div>;
};
const NoMatch = () => {
  return <div>No match</div>;
};

const UnAuthenticatedApp = () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        { path: "*", element: <NoMatch /> },
      ],
    },
  ];
  const renderRoutes = useRoutes(routes);

  return <>{renderRoutes}</>;
};

export default UnAuthenticatedApp;
