import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/web/Home";
import { Register } from "../pages/web/Register";
import { Login } from "../pages/web/Login";
import { WebLayout } from "../layouts/web/WebLayout";

const routes = createBrowserRouter([

    
    {
        path: "/",
        element: <WebLayout />,
        children:[
                {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
        ]
    },
    {
        path:"/admin"
    }
]);



export default routes;
