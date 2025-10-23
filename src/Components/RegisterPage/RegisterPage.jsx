import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
    const { createUser, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();
        console.log('Register form submitted'); // Debug: Confirm form submission
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        console.log('Form data:', { name, email, photo, password }); // Debug: Log form data

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log('Register Successful:', user); // Debug: Log success
                setUser(user);
                toast.success('Registration successful!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                });
                navigate('/');
            })
            .catch(error => {
                console.error('Register Error:', error.code, error.message); // Debug: Log error
                let errorMessage = error.message;
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'This email is already in use. Please use a different email or log in.';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'Password is too weak. Please use a stronger password (at least 6 characters).';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email format. Please enter a valid email address.';
                        break;
                    default:
                        errorMessage = `Registration failed: ${error.message}`;
                }
                toast.error(errorMessage, {
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
        <div className="hero min-h-screen bg-green-50">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-green-700">Register now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card w-full max-w-sm shadow-2xl bg-white">
                    <form onSubmit={handleRegister}>
                        <div className="card-body space-y-3">
                            {/* Name */}
                            <div>
                                <label className="label text-green-700">
                                    <span className="label-text font-bold">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input input-bordered bg-green-100 border-green-300"
                                    required
                                />
                            </div>
                            {/* Email */}
                            <div>
                                <label className="label text-green-700">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input input-bordered bg-green-100 border-green-300"
                                    required
                                />
                            </div>
                            {/* Photo URL */}
                            <div>
                                <label className="label text-green-700">
                                    <span className="label-text font-bold">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="photo"
                                    className="input input-bordered bg-green-100 border-green-300"
                                />
                            </div>
                            {/* Password */}
                            <div>
                                <label className="label text-green-700">
                                    <span className="label-text font-bold">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="input input-bordered bg-green-100 border-green-300"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="rounded bg-green-300 w-full px-5 py-2 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-green-400 hover:text-black"
                                >
                                    Register
                                </button>
                            </div>
                            <p className="text-center mt-4">
                                Already have an account?{' '}
                                <Link to="/login" className="text-green-700 font-bold underline">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
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

export default RegisterPage;