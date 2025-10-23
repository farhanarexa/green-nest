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
        console.log('Attempting Logout');
        logOut() 
            .then(() => {
                console.log('Logout Successful');
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
                console.error('Logout Error:', error.code, error.message);
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

    return (
        <div className="navbar bg-green-200 shadow-sm">
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
                        className="menu menu-sm dropdown-content bg-green-300 rounded-box z-10 mt-3 w-52 p-2 shadow"
                    >
                        <li className="hover:-translate-y-0.5 hover:bg-green-400 hover:font-bold">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="hover:-translate-y-0.5 hover:bg-green-400 hover:font-bold">
                            <Link to="/plants">Plants</Link>
                        </li>
                        <li className="hover:-translate-y-0.5 hover:bg-green-400 hover:font-bold">
                            <Link to="/about">About</Link>
                        </li>
                        {user && (
                            <li className="hover:-translate-y-0.5 hover:bg-green-400 hover:font-bold">
                                <Link to="/profile">My Profile</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <div className="navbar-center">
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-3xl">
                        <img className="w-10 rounded-2xl" src={logo} alt="GreenNest Logo" />
                    </span>
                    <div>
                        <span className="text-3xl font-bold text-green-700">GreenNest</span>
                    </div>
                </Link>
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    src={user.photoURL || 'https://i.pravatar.cc/150?u=a042581f4e29026704d'}
                                    alt="Profile"
                                />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-white rounded-box w-52"
                        >
                            <li>
                               <p className="font-bold text-black">{user.displayName ? user.displayName : user.email}</p>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2 sm:gap-3">
                        <Link
                            to="/login"
                            className="text-green-700 hover:bg-green-400 hover:text-black rounded-full p-2 sm:p-3 transition"
                        >
                            <FaSignInAlt size={20} className="sm:h-6 sm:w-6" />
                        </Link>
                        <Link
                            to="/register"
                            className="text-green-700 hover:bg-green-400 hover:text-black rounded-full p-2 sm:p-3 transition"
                        >
                            <FaUserPlus size={20} className="sm:h-6 sm:w-6" />
                        </Link>
                    </div>
                )}
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ zIndex: 9999 }}
            />
        </div>
    );
};

export default Navbar;