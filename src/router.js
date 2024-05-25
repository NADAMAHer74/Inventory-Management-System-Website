import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./shared/NotFound";
import AddForm from "./components/warehouses/Add";
import UpdateForm from "./components/warehouses/UpdateForm";
import Warehouse from "./components/warehouses/Warehouse";
import Products from "./components/products/Products";
import Home_sup from "./components/super/Home_sup";
import Add_sup from "./components/super/Add_suppp";
import Read_sup from "./components/super/Read_supppp";
import Update_sup from "./components/super/Update_supppp";
import AddProduct from "./components/products/AddProduct";
import UpdateProduct from "./components/products/UpdateProduct";
import Show from "./components/Historyshow/Show";
import Sendreq from "./components/Sendrequest/Sendreq";
import Body from "./components/relatedproduct/Body";
import Login from "./pages/Login";
import Admin from "./middleware/Admin";
import { Children } from "react";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  // warehouses
  {
    path: "/warehouses",
    element: <Warehouse />,
  },
  {
    path: "/warehouses/show/:key",
    element: <Products />,
  },
  {
    path: "/warehouses/add",
    element: <AddForm />,
  },
  {
    path: "/warehouses/update/:key",
    element: <UpdateForm />,
  },
  // {
  //   path: "/warehouses/delete",
  //   element: <div>delete</div>,
  // },
  // {
  //   path: "/products/add",
  //   element: <div>add</div>,
  // },

  {
    path: "*",
    element: <NotFound />,
  },
  //supervisor
  {
    path: "/homess",
    element: <Home_sup />,
  },

  {
    path: "/users",
    element: <Add_sup />,
  },

  {
    path: "/read/:id",
    element: <Read_sup />,
  },

  {
    path: "/update/:id",
    element: <Update_sup />,
  },

  //manage product
  // {
  // path:"/products",
  // element: <Admin/>,
  // children : [
  //   {
  //     path:"",
  //     element: <Products />
  //   },
  // {
  // path:'AddProduct',
  //  element:<AddProduct/>
  // },

  // {
  // path:'UpdateProduct/:id',
  //  element:<UpdateProduct/>,
  // },
  // ],
  // }

  {
    path: "/product",
    element: <Products />,
  },

  {
    path: "AddProduct",
    element: <AddProduct />,
  },

  {
    path: "/UpdateProduct/:id",
    element: <UpdateProduct />,
  },
  {
    path: "/show",
    element: <Show />,
  },

  {
    path: "/sendreq",
    element: <Sendreq />,
  },

  {
    path: "/body",
    element: <Body />,
  },
  //guest middleware

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);
