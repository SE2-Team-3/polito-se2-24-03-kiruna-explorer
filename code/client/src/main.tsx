import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap-icons/font/bootstrap-icons.css";
import "leaflet/dist/leaflet.css";
import "@xyflow/react/dist/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

const router = createBrowserRouter([{ path: "/*", element: <App /> }]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
