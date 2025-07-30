import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Singup from "./pages/Signup.jsx";
import AccontInfo from "./pages/account.jsx";
import Designers from "./pages/Designers.jsx";
import NotfoundPage from "./pages/Notf.jsx";
import Support from "./pages/Support.jsx";

const router = createBrowserRouter(
  [
    { path: "/", element: <App /> },
    { path: "/login", element: <Login /> },
    { path: "/singup", element: <Singup /> },
    { path: "/account", element: <AccontInfo /> },
    { path: "/designers", element: <Designers /> },
    { path: "/support", element: <Support /> },
    { path: "*", element: <NotfoundPage /> },
  ],
  {
    basename: "/Move-Page",
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
