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
import ErrorPage from './Components/ErrorPage/ErrorPage.jsx';
import Contact from './Components/Contact/Contact.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
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
        path: "contact",
        Component: Contact,
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
      // {
      //   path: "*",
      //   Component: ErrorPage,
      // },


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
