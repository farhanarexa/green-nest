import React from 'react';
import { Link } from 'react-router';
import logo from '../../../assets/Green-leaves-logo-2.png';

const Navbar = () => {
  const user = false; // mock user — set to true to see avatar dropdown
  //   const user = true; // mock user — set to true to see avatar dropdown

  return (
    <div className="navbar fixed top-0 z-50 bg-transparent  shadow-sm">
      {/* Left: Hamburger menu (mobile) */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white  rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/plants">Plants</Link></li>
            <li><Link to="/about">About</Link></li>
            {user && <li><Link to="/profile">My Profile</Link></li>}
          </ul>
        </div>
      </div>

      {/* Center: Logo */}
      {/* <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          GreenNest
        </Link>
      </div> */}

      <Link to="/" className="flex items-center gap-2">
        <span className="text-3xl"><img className=" w-20 rounded-2xl" src={logo} alt="" /></span>
        <div>
          <span className="text-3xl font-bold tracking-tight text-green-700">GreenNest</span>
        </div>
      </Link>

      {/* Right: Auth or Avatar */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="rounded bg-white px-5 py-2 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-gray-100">Login</Link>
            <Link to="/register" className="rounded bg-white px-5 py-2 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-gray-100">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;