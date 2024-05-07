import { createBrowserRouter } from "react-router-dom";
import { Homepage, Favorites } from ".";
import { SharedLayout } from "../components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/favorites", element: <Favorites /> },
    ],
  },
]);
