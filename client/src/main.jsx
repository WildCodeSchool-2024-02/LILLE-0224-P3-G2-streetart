import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

import FillArtwork from "./pages/FillArtwork";
import Camera from "./components/NewArtwork/Camera/Camera";
import FormArtwork from "./components/NewArtwork/FormArtwork/FormArtwork";
import ValidationArtwork from "./pages/ValidationArtwork";

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
        path: "/profil",
        element: <Profile />,
      },
    ],
  },

  {
    element: <FillArtwork />,
    children: [
      {
        path: "/ajouter-oeuvre/camera",
        element: <Camera />,
      },
      {
        path: "/ajouter-oeuvre/formulaire",
        element: <FormArtwork />,
      },
      {
        path: "/ajouter-oeuvre/validation",
        element: <ValidationArtwork />,
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
