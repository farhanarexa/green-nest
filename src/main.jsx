import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Root from './Layouts/Home/Root.jsx';
import RegisterPage from './Components/RegisterPage/RegisterPage.jsx';
import LoginPage from './Components/LoginPage/LoginPage.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import PlantDetails from './Components/PlantDetails/PlantDetails.jsx';
import MyProfilePage from './Components/MyProfilePage/MyProfilePage.jsx';
import PlantsPage from './Components/PlantsPage/PlantsPage.jsx';
import HomePage from './Components/HomePage/HomePage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "plants",
        Component: PlantsPage,
      },
      {
        path: "profile",
        Component: MyProfilePage,
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
      {
        path: "plantdetails/:plantId",
        Component: PlantDetails,
      },


    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
