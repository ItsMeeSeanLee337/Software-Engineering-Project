import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Navbar from './Pages/Navbar';
import Display_Custom_Recipes from './Pages/Display_Custom_Recipes';
import Create_Recipe from './Pages/Create_Recipe';
import Home2 from './Pages/Home2';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
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
    path: "home2",
    element: <Home2/>,
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
