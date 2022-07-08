import type { RouteObject } from "react-router-dom";
import { Outlet, Link, useRoutes, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthenticationProvider";

const Layout = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <header>
        <div>Logo</div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/reports">Reports</Link>
            </li>
          </ul>
        </nav>
        <button onClick={() => signout(() => navigate("/"))}>Logout</button>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
};
const Home = () => {
  return (
    <div>
      <h1>Home Dashboard</h1>
    </div>
  );
};
const Reports = () => {
  return (
    <>
      <h1>Reports</h1>
      <div>
        <Outlet />
      </div>
    </>
  );
};
const ReportOverview = () => {
  return <div>Overview</div>;
};
const ReportQuestionsAndAnswers = () => {
  return <div>Questions and answers</div>;
};
const ReportTranscript = () => {
  return <div>Transcript</div>;
};
const ReportIndex = () => {
  return (
    <div>
      <Link to="/reports/:reportId/overview">Overiew</Link>
      <Link to="/reports/:reportId/question-and-answers">Q&A</Link>
      <Link to="/reports/:reportId/transcript">Transcript</Link>
    </div>
  );
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
        { index: true, element: <Home /> },
        {
          path: "/reports",
          element: <Reports />,
          children: [
            { index: true, element: <ReportIndex /> },
            {
              path: "/reports/:reportId/overview",
              element: <ReportOverview />,
            },
            {
              path: "/reports/:reportId/question-and-answers",
              element: <ReportQuestionsAndAnswers />,
            },
            {
              path: "/reports/:reportId/transcript",
              element: <ReportTranscript />,
            },
          ],
        },
        { path: "*", element: <NoMatch /> },
      ],
    },
  ];
  const renderRoutes = useRoutes(routes);

  return <>{renderRoutes}</>;
};

export default UnAuthenticatedApp;
