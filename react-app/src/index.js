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
import Display_Personal_Bio from './Pages/Display_Personal_Bio';
import Create_Edit_Personal_Bio from './Pages/Create_Edit_Personal_Bio';
import Display_Maker_Recipes from './Pages/Display_Maker_Recipes'
import Personalized_Recipes from './Pages/Personalized_Recipes';
import TaggedRecipes from './Pages/TaggedRecipes'
import Bio from './Pages/Bio'
import RecipeSearch from './Pages/recipe_search'

import Substitutions from './Pages/Substitutions';
import Timer from './Pages/Timer';

import Custom_Recipe_Nutritioninfo from './Pages/Custom_Recipe_Nutritioninfo';
import MealPlanner from './Pages/MealPlanner'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './Pages/HomePage';

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
    path: "Bio",
    element: <Bio/>,
  },
  {
    path: "registration",
    element: <Registration/>,
  },
  {
    path: "NutritionalInformation",
    element: <NutritionalInformation/>,
  },
  {
    path: "RecipeSearch",
    element: <RecipeSearch/>,
  },
  {
    path: "display-custom-recipes",
    element: <Display_Custom_Recipes/>,
  },
  {
    path: "display-maker-recipes",
    element: <Display_Maker_Recipes/>,
  },
  {
    path: "TaggedRecipes",
    element: <TaggedRecipes/>,
  },
  {
    path: "MealPlanner",
    element: <MealPlanner/>,
  },
  {
    path: "Display_Personal_Bio",
    element: <Display_Personal_Bio/>,
  },
  {
    path: "Create_Edit_Personal_Bio",
    element: <Create_Edit_Personal_Bio/>,
  },
  {
    path: "HomePage",
    element: <HomePage/>,
  },
  {
    path:"Personalized_Recipes",
    element:<Personalized_Recipes/>
  },
  {
    path: "Timer",
    element: <Timer/>,
  },
  {
    path: "Substitutions",
    element: <Substitutions/>,
  },
  {
    path:"Custom_Recipe_Nutritioninfo",
    element:<Custom_Recipe_Nutritioninfo/>

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
