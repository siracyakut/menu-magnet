import { createBrowserRouter } from "react-router-dom";
import MainLayout from "~/layouts/main";
import Home from "~/pages/home";
import Reviews from "~/pages/reviews";
import NotFound from "~/pages/not-found";
import Contact from "~/pages/contact";
import ManageCategories from "~/pages/manage-categories";
import ManageMenus from "~/pages/manage-menus";
import ProtectedRoute from "~/routes/components/protected-route";
import BusinessPage from "~/pages/business";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "business/categories",
        element: (
          <ProtectedRoute>
            <ManageCategories />
          </ProtectedRoute>
        ),
      },
      {
        path: "business/menus",
        element: (
          <ProtectedRoute>
            <ManageMenus />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/businesses/:slug",
    element: <BusinessPage />,
  },
]);

export default routes;
