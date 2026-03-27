import { createBrowserRouter } from "react-router";
import HomePage from "../pages/homepage/HomePage";
import EditUserPage from "../pages/edituser/EditUserPage";
import Layout from "../components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "edit/:userId", element: <EditUserPage /> },
    ],
  },
]);
