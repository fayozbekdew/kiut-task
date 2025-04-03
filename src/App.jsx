import { lazy } from "react";
import MainLayout from "./layout/MainLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Car from "./pages/Car";
import CarAdd from "./pages/CarAdd";
import CarEdit from "./pages/CarEdit";

function App() {
  const router = createBrowserRouter([
    {
      path: "/car",
      element: <MainLayout />,
      children: [
        {
          index: true,
          path: "/car",
          element: <Car />,
        },
        {
          path: "/car/add",
          element: <CarAdd />,
        },
        {
          path: "/car/edit/:id",
          element: <CarEdit />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
