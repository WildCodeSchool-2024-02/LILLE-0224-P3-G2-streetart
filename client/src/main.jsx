import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import myAxios from "./services/myAxios";


import App from "./App";
import Homepage from "./pages/Homepage";
import Artworks from "./pages/Artworks";
import ArtworkDetails from "./pages/ArtworkDetails";
import RoadMap from "./pages/RoadMap";
import Ranking from "./pages/Ranking";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PanelAdmin from "./pages/PanelAdmin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/oeuvres",
        element: <Artworks />,
      },
      {
        path: "/oeuvre/:id",
        element: <ArtworkDetails />,
      },
      {
        path: "/carte",
        element: <RoadMap />,
      },
      {
        path: "/classement",
        element: <Ranking />,
        loader: async () => {
          const response = await myAxios.get("/api/members-ranked");
          return response.data;
        },
      },
      {
        path: "/inscription",
        element: <Register />,
      },
      {
        path: "/connexion",
        element: <Login />,
      },
      {
        path: "/admin",
        element: <PanelAdmin />,
      },
      {
        path: "/a-propos",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/profil/:id",
        element: <Profile />,
        loader: async ({ params }) => {
          const artworks = await myAxios.get(`/api/artworks/profile/${params.id}`);
      
          return artworks.data;
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
