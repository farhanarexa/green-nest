import React, { useState, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../provider/AuthProvider';

const Contact = () => {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleContact = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const form = event.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const subject = form.subject.value;
        const message = form.message.value;

        // Simple validation
        if (!firstName || !lastName || !email || !subject || !message) {
            toast.error('Please fill in all fields', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
            });
            setIsLoading(false);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
            });
            setIsLoading(false);
            return;
        }

        // Success message
        toast.success('Message sent successfully! We will get back to you soon.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
        });

        // Reset form
        form.reset();
        setIsLoading(false);
    };

    // Extract first and last name from user's displayName
    const getFirstName = () => {
        if (user?.displayName) {
            const nameParts = user.displayName.split(' ');
            return nameParts[0] || '';
        }
        return '';
    };

    const getLastName = () => {
        if (user?.displayName) {
            const nameParts = user.displayName.split(' ');
            return nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
        }
        return '';
    };

    return (
        <div className="container mx-auto my-10 p-5">
            <h2 className="text-5xl font-bold text-center text-green-700 mb-8">Contact Us</h2>
            <div className="card w-full max-w-2xl mx-auto bg-green-50 shadow-xl p-6 sm:p-8">
                <form onSubmit={handleContact} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="label text-green-700">
                                <span className="label-text font-bold">First Name</span>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                className="input input-bordered w-full bg-green-200 border-green-400 text-black placeholder:text-gray-500"
                                placeholder="Your First Name"
                                defaultValue={user ? getFirstName() : ''}
                                disabled={!!user}
                                required
                            />
                        </div>
                        <div>
                            <label className="label text-green-700">
                                <span className="label-text font-bold">Last Name</span>
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                className="input input-bordered w-full bg-green-200 border-green-400 text-black placeholder:text-gray-500"
                                placeholder="Your Last Name"
                                defaultValue={user ? getLastName() : ''}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="label text-green-700">
                            <span className="label-text font-bold">Email</span>
                        </label>
             
             
                        <input
                            type="email"
                            name="email"
                            className="input input-bordered w-full bg-green-200 border-green-400 text-black placeholder:text-gray-500"
                            placeholder="Your Email"
                            defaultValue={user ? user.email : ''}
                            disabled={!!user}
                            required
                        />
                    </div>
                    <div>
                        <label className="label text-green-700">
                            <span className="label-text font-bold">Subject</span>
                        </label>
                        <input
                            type="text"
                            name="subject"
                            className="input input-bordered w-full bg-green-200 border-green-400 text-black placeholder:text-gray-500"
                            placeholder="Your subject"
                            required
                        />
                    </div>
                    <div>
                        <label className="label text-green-700">
                            <span className="label-text font-bold">Message</span>
                        </label>
                        <textarea
                            name="message"
                            className="textarea textarea-bordered w-full bg-green-200 border-green-400 text-black placeholder:text-gray-500 min-h-[150px]"
                            placeholder="Your message here..."
                            required
                        ></textarea>
                    </div>
                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className="rounded bg-green-300 w-full px-5 py-3 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-green-400 hover:text-black"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>
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

export default Contact;