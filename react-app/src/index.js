import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './Pages/Home';
import Navbar from './Pages/Navbar';
import Create_Recipe from './Pages/Create_Recipe';
import Login from './Pages/Login';
import Login_Success from './Pages/Login_Success';

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
    path: "create_recipe",
    element: <Create_Recipe/>,
  },
  {
    path: "login",
    element: <Login/>,

  },
  {
    path: "login_success",
    element: <Login_Success/>,
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
