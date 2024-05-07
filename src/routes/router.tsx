import { createBrowserRouter } from "react-router-dom";
import { Homepage, Favorites } from ".";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
]);
