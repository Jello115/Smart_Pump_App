import { createBrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import App from "./App";
import PrivateRouter from "./components/PrivateRouter";

export const router = createBrowserRouter([
    {path: "/", element: <App /> },
    {path: "/SignUp", element: <SignUp /> },
    {path: "/SignIn", element: <SignIn /> },
    {path: "/Dashboard", element: <PrivateRouter><Dashboard /></PrivateRouter>},
])