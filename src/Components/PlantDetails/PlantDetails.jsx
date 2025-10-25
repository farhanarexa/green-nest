import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../../provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import spinner from '../../assets/logoL.png';

const PlantDetails = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  useLocation();
  const { user, loading } = useContext(AuthContext);
  const [plant, setPlant] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { state: { from: `/plantdetails/${plantId}` } });
    }
  }, [loading, user, navigate, plantId]);

  useEffect(() => {
    fetch('/plants.json')
      .then((response) => response.json())
      .then((data) => {
        const foundPlant = data.find((p) => p.plantId === parseInt(plantId));
        if (foundPlant) {
          setPlant(foundPlant);
        } else {
          navigate('/plants');
        }
      })
      .catch(() => navigate('/plants'));
  }, [plantId, navigate]);

  const handleBookNow = (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error('Please fill in your name and email.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
        toastId: 'booking-error-empty',
      });
      return;
    }

    if (plant.availableStock <= 0) {
      toast.error('Sorry, this plant is currently out of stock.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
        toastId: 'booking-error-stock',
      });
      return;
    }
    toast.success(`Booking confirmed for ${plant.plantName}! Thank you, ${name}!`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
      toastId: 'booking-success',
    });
    setName('');
    setEmail('');
  };

  if (loading) {
    return (
      <div className="container mx-auto my-12 text-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="container mx-auto my-12 flex items-center justify-center min-h-[200px]">
        <div className="relative">
          <img src={spinner} alt="spinner" className="inline-block w-48" />
          <div className="ripple"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-12 px-5">
      <button onClick={() => navigate(-1)} className="rounded bg-green-200 mt-4 px-4 sm:px-5 py-2 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-green-300 hover:text-black text-sm sm:text-base  mb-6">
        ← Back to Previous
      </button>

      <div className="flex flex-col lg:flex-row gap-8 bg-green-50 shadow-xl rounded-box p-6">
        <div className="flex justify-center lg:block w-full lg:w-auto">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <img
              src={plant.image}
              alt={plant.plantName}
              className="w-full max-w-xs lg:max-w-none h-auto object-contain"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div>
            <h2 className="font-bold text-center lg:text-left text-5xl text-green-800">{plant.plantName}</h2>
            <p className="text-sm text-green-700 font-bold mt-1"><span className="font-medium">Provider:</span> {plant.providerName}</p>
          </div>
          <p className="text-lg text-green-800 mt-6">{plant.description}</p>

          <div className=" space-y-2 text-left lg:w-full">
            <div className='md:flex md:justify-around text-2xl font-black mb-10 mt-10 align-center text-green-700'>
              <p><span className="font-black ">Price:</span> ${plant.price}</p>
              <p><span className="font-black">Rating:</span> {plant.rating} ★</p>
            </div>

            <div className='text-green-700 flex justify-around border border-green-400 p-2 rounded-full'>
              <p><span className="font-bold">Category:</span> {plant.category}</p>
              <p><span className="font-bold">Care Level:</span> {plant.careLevel}</p>

              <p>
                <span className="font-bold">Available Stock:</span>{' '}
                <span className={plant.availableStock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {plant.availableStock > 0 ? plant.availableStock : 'Out of Stock'}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-5 border-4 rounded-2xl border-green-300 p-5 bg-green-50">
            <h3 className="text-3xl font-bold mb-5 text-green-700 ">Book This Plant</h3>
            <form onSubmit={handleBookNow}>
              <div className="space-x-3 mb-3">
                <label className="label justify-center lg:justify-start">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs lg:max-w-none mx-auto bg-green-300 lg:mx-0"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-x-3 mb-4">
                <label className="label justify-center lg:justify-start">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full max-w-xs lg:max-w-none mx-auto bg-green-300 lg:mx-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className={`rounded bg-green-300 mt-4 px-4 sm:px-5 py-2 font-bold text-green-700 border transition hover:-translate-y-0.5 hover:bg-green-400 hover:text-black text-sm sm:text-base ${plant.availableStock <= 0 ? 'btn-disabled' : ''}`}
                disabled={plant.availableStock <= 0}
              >
                {plant.availableStock > 0 ? 'Book Now' : 'Out of Stock'}
              </button>
            </form>
          </div>
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

export default PlantDetails;