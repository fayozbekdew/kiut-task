import { lazy } from "react";
import MainLayout from "./layout/MainLayout";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Car from "./pages/Car";
import CarAdd from "./pages/CarAdd";
import CarEdit from "./pages/CarEdit";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/car" replace />, // "/" sahifasiga kirsalar "/car"ga o'tadi
    },
    {
      path: "/car",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Car />, // "/car" asosiy sahifa bo'ladi
        },
        {
          path: "add",
          element: <CarAdd />,
        },
        {
          path: "edit/:id",
          element: <CarEdit />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
