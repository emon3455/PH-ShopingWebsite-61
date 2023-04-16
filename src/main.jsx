import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './Components/Shop/Shop';
import Layout from './Components/Layout/Layout';
import Orders from './Components/Orders/Orders';
import Inventory from './Components/Inventory/Inventory';
import Login from './Components/LogIn/Login';
import cartProductsLoader from './Loaders/CartProductsLoader';
import Checkout from './Components/Checkout/Checkout';
import SignUp from './Components/SignUp/SignUp';
import AuthProvider from './Components/Provider/AuthProvider';
import PrivateRoute from './Components/Route/PrivateRoute';

const router  = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Shop></Shop>
      },
      {
        path: "/orders",
        element: <Orders></Orders>,
        loader: cartProductsLoader
      },
      {
        path: "/inventory",
        element: <PrivateRoute><Inventory></Inventory></PrivateRoute>
      },
      {
        path: "/checkout",
        element: <PrivateRoute>
                    <Checkout></Checkout>
                </PrivateRoute>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
