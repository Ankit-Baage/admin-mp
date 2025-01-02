import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./pages/auth/LogInPage";
import { HomePage } from "./pages/homePage/HomePage";
import {
  checkAuthLoader,
  DashBoardPage,
} from "./pages/dashboard/DashBoardPage";
import { CategoryPage } from "./pages/category/CategoryPage";
import { ErrorPage } from "./pages/error/ErrorPage";
import { RootLayout } from "./pages/RootLayout";
import { AdvertisementPage } from "./pages/advertisement/AdvertisementPage";
import { MastersPage } from "./pages/master/MastersPage";
import { MasterVrpPage } from "./pages/master/masterVrp/MasterVrpPage";
import { MastersVariantPage } from "./pages/master/masterVariant/MastersVariantPage";
import { MastersCategoryPage } from "./pages/master/mastersCategoryPage/MastersCategoryPage";
import { RetailerPage } from "./pages/retailer/RetailerPage";
import { OrderPage } from "./pages/order/OrderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LoginPage /> },
      {
        path: "dashboard",
        element: <DashBoardPage />,
        loader: checkAuthLoader,
        children: [
          { index: true, element: <HomePage /> },
          { path: ":category", element: <CategoryPage /> },
          { path: "advertisement", element: <AdvertisementPage /> },

          {
            path: "masters",
            element: <MastersPage />,
            children: [
              { path: "vrp", element: <MasterVrpPage /> },
              {
                path: ":category",
                element: <MastersCategoryPage />,
              },
              { path: ":category/variants", element: <MastersVariantPage /> },
            ],
          },

          { path: "retailers", element: <RetailerPage /> },
          { path: "orders", element: <OrderPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
