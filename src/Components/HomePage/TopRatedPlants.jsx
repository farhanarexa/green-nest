// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router';

// const TopRatedPlants = () => {
//   const [plants, setPlants] = useState([]);

//   useEffect(() => {
//     fetch('/plants.json')
//       .then(response => response.json())
//       .then(data => {

//         const filteredPlants = data.filter(plant => plant.rating > 4.6);
//         setPlants(filteredPlants);
//       })
//       .catch(error => {
//         console.error('Error fetching plants:', error);
//       });
//   }, []);

//   return (
//     <div className="py-12 bg-green-50">
//       <h2 className="text-4xl font-bold text-center text-green-700 mb-8">Top Rated Indoor Plants</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
//         {plants.map(plant => (
//           <div key={plant.plantId} className="card bg-white shadow-xl">
//             <figure className="px-4 pt-4">
//               <img src={plant.image} alt={plant.plantName} className="rounded-xl h-90 w-full object-cover" />
//             </figure>
//             <div className="card-body text-center">
//                <h2 className="card-title text-3xl text-green-800 block m-auto">{plant.plantName}</h2>
//                             <div className='text-base text-green-700 text-center'>
//                                 <p>Price: ${plant.price}</p>
//                                 <p>Rating: {plant.rating}</p>
//                             </div>
//               <div className="card-actions justify-center mt-4">
//                  <Link to={`/plantdetails/${plant.plantId}`}><button className="rounded bg-green-200 mt-4 px-4 sm:px-5 py-2 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-green-300 hover:text-black text-sm sm:text-base w-full">View Details</button></Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Link to={"/plants"}>
//       <button className="rounded bg-green-300 px-5 py-2 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-green-400 hover:text-black block m-auto mt-7">See All Plants</button>
//       </Link>
//     </div>
//   );
// };

// export default TopRatedPlants;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const TopRatedPlants = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch('/plants.json')
      .then(response => response.json())
      .then(data => {
        const filteredPlants = data.filter(plant => plant.rating > 4.6);
        setPlants(filteredPlants);
      })
      .catch(error => {
        console.error('Error fetching plants:', error);
      });
  }, []);

  return (
    <div className="py-12 bg-green-50">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-8">Top Rated Indoor Plants</h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={true}
        slidesPerView={1}
        spaceBetween={32}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 24
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 32
          }
        }}
        className="mySwiper max-w-6xl mx-auto px-4"
      >
        {plants.length > 0 ? (
          plants.map(plant => (
            <SwiperSlide key={plant.plantId}>
              <div className="card bg-white shadow-xl flex flex-col justify-between">
                <figure className="px-4 pt-4 flex-shrink-0">
                  <img
                    src={plant.image}
                    alt={plant.plantName}
                    className="rounded-xl h-80 w-full object-cover"
                  />
                </figure>
                <div className="card-body text-center flex-grow p-5">
                  <h2 className="card-title text-2xl text-green-800 block m-auto">{plant.plantName}</h2>
                  <div className="text-base text-green-700 text-center flex-grow flex flex-col justify-center">
                    <p>Price: ${plant.price}</p>
                    <p>Rating: {plant.rating}</p>
                  </div>
                  <div className="card-actions justify-center mt-4">
                    <Link to={`/plantdetails/${plant.plantId}`}>
                      <button className="rounded bg-green-200 px-4 sm:px-5 py-2 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-green-300 hover:text-black text-sm sm:text-base w-full">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div className="col-span-full text-center text-xl text-gray-600">
            No top-rated plants available at the moment.
          </div>
        )}
      </Swiper>
      <Link to={"/plants"}>
        <button className="rounded bg-green-300 px-5 py-2 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-green-400 hover:text-black block m-auto mt-7">
          See All Plants
        </button>
      </Link>
    </div>
  );
};

export default TopRatedPlants;