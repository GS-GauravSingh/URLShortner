import React from "react";
import ReactDOM from "react-dom/client"
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import "./main.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout";

// The "createBrowserRouter" function, allows you to define the paths and specify which component to render when the application is at a particular path.
const router = createBrowserRouter([

    // Path to Root - Home Page
    {
        path: "/",
        element: <Layout />,

        // All these children routes (componets) are render inside the <Outlet>, we placed in Layout.jsx.
        children: [
            {
                path: "",
                element: <HomePage />
            },

            {
                path: "signup",
                element: <SignUp />
            },

            {
                path: "signin",
                element: <SignIn />
            }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

