import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { GoogleAuthProvider } from 'firebase/auth';
import { BsGoogle, BsEye, BsEyeSlash } from 'react-icons/bs';
import { AuthContext } from '../../provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const googleProvider = new GoogleAuthProvider();

const RegisterPage = () => {
    const { createUser, setUser, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const validatePassword = (password) => {
        if (password.length < 6) {
            return 'Password must be at least 6 characters long.';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (!/[a-z]/.test(password)) {
            return 'Password must contain at least one lowercase letter.';
        }
        return '';
    };

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        setPasswordError('');
        signInWithGoogle(googleProvider)
            .then(result => {
                console.log('Google Sign-In Successful:', result.user);
                toast.success('Registered with Google successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                    toastId: 'google-register-success',
                    onOpen: () => console.log('Google register toast opened'),
                    onClose: () => console.log('Google register toast closed'),
                });
                setTimeout(() => navigate('/'), 3200);
            })
            .catch(error => {
                console.error('Google Sign-In Error:', error.message);
                toast.error('Google registration failed: ' + error.message, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                });
            })
            .finally(() => setIsLoading(false));
    };

    const handleRegister = (event) => {
        event.preventDefault();
        console.log('Register form submitted');
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        console.log('Form data:', { name, email, photo, password });

        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            toast.error(passwordValidationError, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
            });
            return;
        }

        setIsLoading(true);
        setPasswordError('');
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log('Register Successful:', user);
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
                setTimeout(() => navigate('/'), 3200);
            })
            .catch(error => {
                console.error('Register Error:', error.code, error.message);
                let errorMessage = error.message;
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'This email is already in use. Please use a different email or log in.';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'Password is too weak. Please use a stronger password.';
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
            })
            .finally(() => setIsLoading(false));
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
                            {passwordError && (
                                <div className="alert alert-error bg-red-100 text-red-700">
                                    {passwordError}
                                </div>
                            )}
                            <div>
                                <label className="label text-green-700">
                                    <span className="label-text font-bold">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input input-bordered bg-green-100 border-green-300"
                                    required
                                    disabled={isLoading}
                                />
                            </div>


                            <div>
                                <label className="label text-green-700">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input input-bordered bg-green-100 border-green-300"
                                    required
                                    disabled={isLoading}
                                />
                            </div>


                            <div>
                                <label className="label text-green-700">
                                    <span className="label-text font-bold">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="photo"
                                    className="input input-bordered bg-green-100 border-green-300"
                                    disabled={isLoading}
                                />
                            </div>


                            <div className='relative'>
                                <label className="label text-green-700">
                                    <span className="label-text font-bold">Password</span>
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    className="input input-bordered bg-green-100 border-green-300 w-full pr-10"
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-[62%] transform -translate-y-1/2 text-green-700 hover:text-green-900 z-10"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                                </button>
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="rounded bg-green-300 w-full px-5 py-2 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-green-400 hover:text-black"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Registering...' : 'Register'}
                                </button>
                            </div>
                            <div className="divider">OR</div>
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="rounded border-2 px-5 py-2 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-green-200 flex items-center gap-2 justify-center"
                                disabled={isLoading}
                            >
                                <BsGoogle size={20} /> Sign up with Google
                            </button>
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