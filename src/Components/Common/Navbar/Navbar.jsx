import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../../assets/logoL.png';
import { AuthContext } from '../../../provider/AuthProvider';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success('Logged out successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });
        navigate('/login');
      })
      .catch(error => {
        console.error('Logout Error:', error.message);
        toast.error(`Logout failed: ${error.message}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });
      });
  };

  // Clean fallback avatar URL (no extra spaces!)
  const getAvatarUrl = () => {
    if (user?.photoURL) return user.photoURL;
    if (user?.email) return `https://i.pravatar.cc/150?u=${encodeURIComponent(user.email)}`;
    return 'https://i.pravatar.cc/150?u=default';
  };

  return (
    <div className="navbar bg-green-200 px-4 sm:px-6 md:px-10 lg:px-20 shadow-sm sticky top-0 z-50">
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
            className="menu menu-sm dropdown-content bg-green-300 rounded-box z-10 mt-3 w-48 p-2 shadow"
          >
            <li className="hover:-translate-y-0.5 hover:bg-green-400 hover:font-bold">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:-translate-y-0.5 hover:bg-green-400 hover:font-bold">
              <Link to="/plants">All Plants</Link>
            </li>
            <li className="hover:-translate-y-0.5 hover:bg-green-400 hover:font-bold">
              <Link to="/contact">Contact Us</Link>
            </li>
            {user && (
              <li className="hover:-translate-y-0.5 hover:bg-green-400 hover:font-bold">
                <Link to="/profile">My Profile</Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Centered Logo */}
      <div className="navbar-center">
        <Link to="/" className="flex items-center gap-2">
          <img
            className="w-6 sm:w-8 md:w-10 rounded-2xl"
            src={logo}
            alt="GreenNest Logo"
          />
          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 whitespace-nowrap">
            GreenNest
          </span>
        </Link>
      </div>

      {/* Auth Buttons / Avatar */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full">
                <img src={getAvatarUrl()} alt="Profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-white rounded-box w-48"
            >
              <li>
                <p className="font-bold text-black px-2 py-1 break-all">
                  {user.displayName || user.email}
                </p>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-left px-2 py-1 hover:bg-red-100 hover:text-red-600 rounded"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="text-green-700 hover:bg-green-400 hover:text-black rounded-full p-2 transition"
              aria-label="Login"
            >
              <FaSignInAlt size={18} className="sm:w-6 sm:h-6" />
            </Link>
            <Link
              to="/register"
              className="text-green-700 hover:bg-green-400 hover:text-black rounded-full p-2 transition"
              aria-label="Register"
            >
              <FaUserPlus size={18} className="sm:w-6 sm:h-6" />
            </Link>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
};

export default Navbar;