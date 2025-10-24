import React, { useContext, useState } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { BsGoogle, BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link, useNavigate, useLocation } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../provider/AuthProvider';

const googleProvider = new GoogleAuthProvider();

const LoginPage = () => {
    const { signInWithGoogle, signInWithEmail, resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetError, setResetError] = useState('');

    const from = location.state?.from || '/plants';

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        setErrorMessage('');
        signInWithGoogle(googleProvider)
            .then((result) => {
                console.log('Google Sign-In Successful:', result.user);
                toast.success('Logged in with Google successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                    toastId: 'google-login-success',
                    onOpen: () => console.log('Google login toast opened'),
                    onClose: () => {
                        console.log('Google login toast closed');
                        navigate(from, { replace: true });
                    },
                });
            })
            .catch((error) => {
                console.error('Google Sign-In Error:', error.message);
                setErrorMessage('Google login failed. Please try again.');
                toast.error('Google login failed: ' + error.message, {
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

    const handleEmailPasswordLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        setErrorMessage('');
        setIsLoading(true);

        signInWithEmail(email, password)
            .then((result) => {
                console.log('Email Login Successful:', result.user);
                toast.success('Logged in successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                    toastId: 'email-login-success',
                    onOpen: () => console.log('Email login toast opened'),
                    onClose: () => {
                        console.log('Email login toast closed');
                        navigate(from, { replace: true });
                    },
                });
            })
            .catch((error) => {
                console.error('Email Login Error:', error.code, error.message);
                let message = 'Login failed. Please check your email or password.';
                if (error.code === 'auth/user-not-found') {
                    message = 'No account found. Please sign up first.';
                } else if (error.code === 'auth/wrong-password') {
                    message = 'Incorrect password. Please try again.';
                }
                setErrorMessage(message);
                toast.error(message, {
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

    const handlePasswordReset = (e) => {
        e.preventDefault();
        setResetError('');
        setIsLoading(true);

        resetPassword(resetEmail)
            .then(() => {
                toast.success('Password reset email sent! Check your inbox.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                    toastId: 'reset-password-success',
                });
                setShowResetModal(false);
                setResetEmail('');
            })
            .catch((error) => {
                console.error('Password Reset Error:', error.code, error.message);
                let message = 'Failed to send reset email. Please try again.';
                if (error.code === 'auth/invalid-email') {
                    message = 'Invalid email format. Please enter a valid email.';
                } else if (error.code === 'auth/user-not-found') {
                    message = 'No account found for this email.';
                }
                setResetError(message);
                toast.error(message, {
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
                    <h1 className="text-5xl font-bold text-green-700">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card w-full max-w-sm shadow-2xl bg-white">
                    <form onSubmit={handleEmailPasswordLogin}>
                        <div className="card-body space-y-3">
                            {errorMessage && (
                                <div className="alert alert-error bg-red-100 text-red-700">
                                    {errorMessage}{' '}
                                    {errorMessage.includes('sign up') && (
                                        <Link to="/register" className="underline font-bold">
                                            Sign up
                                        </Link>
                                    )}
                                </div>
                            )}

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

                            <div className="relative">
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
                            
                            <label className="label">
                                <button
                                    type="button"
                                    className="label-text-alt link text-green-700 link-hover"
                                    onClick={() => setShowResetModal(true)}
                                    disabled={isLoading}
                                >
                                    Forgot password?
                                </button>
                            </label>
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="rounded bg-green-300 w-full px-5 py-2 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-green-400 hover:text-black"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                            <div className="divider">OR</div>
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="rounded border-2 px-5 py-2 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-green-200 flex items-center gap-2 justify-center"
                                disabled={isLoading}
                            >
                                <BsGoogle size={20} /> Sign in with Google
                            </button>
                            <p className="text-center mt-4">
                                Don't have an account?{' '}
                                <Link className="text-green-700 font-bold underline" to="/register">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            {showResetModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="card w-full max-w-sm bg-white shadow-xl">
                        <div className="card-body space-y-3">
                            <h2 className="text-xl font-bold text-green-700">Reset Password</h2>
                            <p className="text-sm text-gray-600">Enter your email to receive a password reset link.</p>
                            {resetError && (
                                <div className="alert alert-error bg-red-100 text-red-700">
                                    {resetError}
                                </div>
                            )}
                            <form onSubmit={handlePasswordReset}>
                                <div>
                                    <label className="label text-green-700">
                                        <span className="label-text font-bold">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        className="input input-bordered bg-green-100 border-green-300 w-full"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="form-control mt-6 flex gap-2">
                                    <button
                                        type="submit"
                                        className="rounded bg-green-300 w-full px-5 py-2 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-green-400 hover:text-black"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded bg-gray-200 w-full px-5 py-2 font-bold text-gray-700 transition hover:-translate-y-0.5 hover:bg-gray-300"
                                        onClick={() => {
                                            setShowResetModal(false);
                                            setResetEmail('');
                                            setResetError('');
                                        }}
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

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

export default LoginPage;