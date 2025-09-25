import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/web/Home";
import { WebLayout } from "../layouts/web/WebLayout";
import { Login, Register, GameDetail } from "../pages/web";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <WebLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/game",
        element: <GameDetail />,
      },
    ],
  },
  {
    path: "/admin",
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default routes;
