import React from 'react'
import { Link, useNavigate, useRouteError } from 'react-router'
import sadplant from '../../assets/Wilted_Plant.jpg'

const ErrorPage = () => {
    const error = useRouteError()
    const navigate = useNavigate()



    return (
        <div className="container mx-auto my-10 p-5 bg-green-50 min-h-screen flex flex-col justify-center items-center">
            <div className="text-center">
                <img className="h-64 w-64 object-cover rounded-4xl mx-auto mb-8" src={sadplant} alt="Wilted Plant" />
                <h2 className="text-5xl font-bold text-green-700 mb-4">Oops! Something Went Wrong</h2>
                <p className="text-base text-green-800 mb-6">
                    {error?.status === 404 ? "This page seems to have wilted away!" : "Our garden encountered an unexpected pest!"}
                </p>
                <p className="text-base text-green-600 mb-8">
                    {error?.statusText || error?.message || "Please try again later."}
                </p>
                <Link to="/">
                    <button onClick={() => navigate(-1)} className="rounded bg-green-200 px-4 sm:px-5 py-2 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-green-300 hover:text-black text-sm sm:text-base">
                        Go Back
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ErrorPage