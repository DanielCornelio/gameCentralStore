import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/web/Home";
import { Games } from "../pages/web/Games";
import { Profile } from "../pages/web/Profile";
import { WebLayout } from "../layouts/web/WebLayout";
import { Login, Register, GameDetail, Cart } from "../pages/web";
import { Profile } from "../pages/admin/Profile";
import { Password } from "../pages/admin/Password";
import { Products } from "../pages/admin/Products";

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
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/password",
        element: <Password />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/profile",
        element: <Profile />,
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
