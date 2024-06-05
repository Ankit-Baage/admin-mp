import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { RootLayout } from "./pages/RootLayout";
import { Home } from "./pages/home/Home";
import { LoginPage } from "./pages/authentication/login/LoginPage";
import { Authentication } from "./pages/authentication/Authentication";

import { checkAuthLoader } from "./utils/loaders/checkAuthLoader";

import "./App.css";
import { VrpPage } from "./pages/vrp/VrpPage";
import { ErrorPage } from "./pages/error/ErrorPage";
import { SparesPage } from "./pages/spares/SparesPage";
import { HomePage } from "./pages/home/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Authentication />,
        children: [{ index: true, element: <LoginPage /> }],
      },
      {
        path: "/home",
        element: <Home />,
        loader: checkAuthLoader,
        children: [
          { index: true, element: <HomePage /> },
          { path: "vrp", element: <VrpPage /> },
          { path: "spares", element: <SparesPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
