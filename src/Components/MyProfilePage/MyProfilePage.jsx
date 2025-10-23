import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfilePage = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isEditing) {
            setName(user?.displayName || '');
            setPhotoURL(user?.photoURL || '');
        }
    }, [isEditing, user]);

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        setIsLoading(true);
        updateUserProfile(name, photoURL)
            .then(() => {
                toast.success('Profile updated successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                });
                setIsEditing(false);
            })
            .catch(error => {
                console.error('Profile Update Error:', error.message);
                toast.error('Failed to update profile: ' + error.message, {
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
        <div className="container mx-auto my-12">
            <h2 className="text-3xl font-bold text-center mb-8">My Profile</h2>
            <div className="card w-96 bg-green-100 shadow-xl mx-auto">
                <figure className="px-10 pt-10">
                    <img
                        src={user?.photoURL || 'https://i.pravatar.cc/150?u=a042581f4e29026704d'}
                        alt="User Avatar"
                        className="rounded-xl h-50 w-50"
                    />
                </figure>
                <div className="card-body items-center text-center">
                    {isEditing ? (
                        <form onSubmit={handleUpdateProfile} className="w-full space-y-4">
                            <div>
                                <label className="label">
                                    <span className="label-text font-bold">Name</span>
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input input-bordered w-full bg-green-300"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-bold">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    className="input input-bordered w-full bg-green-300"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="card-actions justify-center space-x-2">
                                <button
                                    type="submit"
                                    className="btn bg-green-500 text-white hover:bg-green-600 border-green-600 hover:border-green-700 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Updating...' : (
                                        <>
                                            <span>Save Changes</span>
                                            <span role="img" aria-label="leaf">🌿</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setIsEditing(false)}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <h2 className="card-title">{user?.displayName || 'No Name Provided'}</h2>
                            <p>{user?.email || 'No Email Provided'}</p>
                            <div className="card-actions">
                                <button
                                    className="rounded bg-green-300 px-5 py-2 font-bold text-green-700 border transition hover:-translate-y-0.5 hover:bg-green-400 hover:text-black"
                                    onClick={() => setIsEditing(true)}
                                    disabled={isLoading}
                                >
                                    Update Profile
                                </button>
                            </div>
                        </>
                    )}
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

export default MyProfilePage;