import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import myAxios from "./services/myAxios";

import App from "./App";
import Homepage from "./pages/Homepage";
import Artworks from "./pages/Artworks";
import ArtworkDetails from "./pages/ArtworkDetails";
import RoadMap from "./pages/RoadMap";
import Ranking from "./pages/Ranking";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import ProfileEdition from "./pages/ProfileEdition";
import RecoverPassword from "./pages/RecoverPassword";
import PwdEdition from "./pages/PwdEdition";
import FillArtwork from "./pages/FillArtwork";
import Camera from "./components/NewArtwork/Camera/Camera";
import FormArtwork from "./components/NewArtwork/FormArtwork/FormArtwork";
import ValidationArtwork from "./pages/ValidationArtwork";
import Admin from "./pages/Admin/Admin";
import Members from "./pages/Admin/Members";
import Statistiques from "./pages/Admin/Statistiques";
import ArtworksReported from "./pages/Admin/ArtworksReported";
import ArtworksValidation from "./pages/Admin/ArtworksValidation";
import ArtworkNotValidateDetails from "./pages/ArtworkNotValidateDetails";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
        loader: async () => {
          const response = await myAxios.get("/api/artworks");
          return response.data;
        },
      },
      {
        path: "/oeuvres",
        element: <Artworks />,
        loader: async () => {
          const response = await myAxios.get("/api/artworks");
          return response.data;
        },
      },
      {
        path: "/oeuvre/:id",
        element: <ArtworkDetails />,
        loader: async ({ params }) => {
          const artwork = await myAxios.get(`/api/artworks/${params.id}`);
          if (artwork.data.validate === 0) {
            return redirect("/oeuvres");
          }
          return artwork.data;
        },
      },
      {
        path: "/carte",
        element: <RoadMap />,
        loader: async () => {
          const response = await myAxios.get("/api/artworks");
          return response.data;
        },
      },
      {
        path: "/classement",
        element: <Ranking />,
        loader: async () => {
          const response = await myAxios.get("/api/members/ranked");
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
      },
      {
        path: "/profil/edit/:id",
        element: <ProfileEdition />,
      },
      {
        path: "/recuperation-mdp",
        element: <RecoverPassword />,
      },
      {
        path: "/recuperation-mdp/:token",
        element: <PwdEdition />,
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
      },
    ],
  },
  {
    element: <Admin />,
    children: [
      {
        path: "/admin/statistiques",
        element: <Statistiques />,
      },
      {
        path: "/admin/membres",
        element: <Members />,
      },
      {
        path: "/admin/oeuvres-a-valider",
        element: <ArtworksValidation />,
        loader: async () => {
          const artworkNV = await myAxios.get(
            "api/artworks/admin/not-validate"
          );
          return artworkNV.data;
        },
      },
      {
        path: "/oeuvre-non-validee/:id",
        element: <ArtworkNotValidateDetails />,
        loader: async ({ params }) => {
          const artworksNVD = await myAxios.get(
            `/api/artworks/admin/not-validate/${params.id}`
          );

          return artworksNVD.data;
        },
      },
      {
        path: "/admin/oeuvres-signalees",
        element: <ArtworksReported />,
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
