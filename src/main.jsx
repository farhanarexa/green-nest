import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Root from './Layouts/Home/Root.jsx';
import Home from './Components/Common/Navbar/Home.jsx';
import Plants from './Components/Common/Navbar/Plants.jsx';
import MyProfile from './Components/Common/Navbar/MyProfile.jsx';
import RegisterPage from './Components/RegisterPage/RegisterPage.jsx';
import LoginPage from './Components/LoginPage/LoginPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root ,
    children: [
      {
        path: "/",
        Component: Home ,
      },
      {
        path: "plants",
        Component: Plants,
      },
      {
        path: "profile",
        Component: MyProfile,
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },


    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />  </StrictMode>,
)
