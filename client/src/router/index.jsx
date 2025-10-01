import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/web/Home";
import { Games } from "../pages/web/Games";
import { WebLayout } from "../layouts/web/WebLayout";
import { Login, Register, GameDetail, Cart } from "../pages/web";

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
        path: "/games",
        element: <Games />,
      },
      {
        path: "/games/:id",
        element: <GameDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
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
