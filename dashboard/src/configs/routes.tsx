import AuthLayout from "@layouts/auth/auth-layout";
import { DashboardLayout } from "@layouts/dashboard/dashboard-layout";
import RootLayout from "@layouts/root/root-layout";

import { Dashboard, Error404, Login } from "@pages/index";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            index: true,
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            path: "login",
            element: <Login />,
          },
        ],
      },
    ],
  },
  {
    path: "/*",
    element: <Error404 />,
  },
]);
