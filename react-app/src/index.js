import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Landing_page from './Pages/Landing_page';
import Login from './Pages/Login';
import Display_Custom_Recipes from './Pages/Display_Custom_Recipes';
import Create_Recipe from './Pages/Create_Recipe';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import Login_Success from './Pages/Login_Success';
import Registration from './Pages/Registration';
import NutritionalInformation from './Pages/nutritional_info';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing_page/>,
  },
  {
    path: "home",
    element: <Home/>,
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "create_recipe",
    element: <Create_Recipe/>,
  },
  {
    path: "display-custom-recipes",
    element: <Display_Custom_Recipes/>,
  },
  {
    path: "login",
    element: <Login/>,

  },
  {
    path: "Login_Success",
    element: <Login_Success/>,
  },
  {
    path: "registration",
    element: <Registration/>,
  },
  {
    path: "NutritionalInformation",
    element: <NutritionalInformation/>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
