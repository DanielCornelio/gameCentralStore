import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/web/Home";
import { Games } from "../pages/web/Games";
import { Profile } from "../pages/web/Profile";
import { WebLayout } from "../layouts/web/WebLayout";
import { Login2, Register2, GameDetail, Cart, Favorites } from "../pages/web";
import { ProtectedRoute } from "../components";

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
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/favorites",
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
  },
  {
    path: "/login",
    element: <Login2 />,
  },
  {
    path: "/register",
    element: <Register2 />,
  },
]);

export default routes;
