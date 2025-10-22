import React from 'react';

const MyProfilePage = () => {
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        photoURL: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
    };

    return (
        <div className="container mx-auto my-12">
            <h2 className="text-3xl font-bold text-center mb-8">My Profile</h2>
            <div className="card w-96 bg-base-100 shadow-xl mx-auto">
                <figure className="px-10 pt-10">
                    <img src={user.photoURL} alt="User Avatar" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{user.name}</h2>
                    <p>{user.email}</p>
                    <div className="card-actions">
                        <button className="btn btn-primary">Update Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;