import React from 'react';
import bgImage from '../../assets/bg3.jpg'; 

const HomePage = () => {
  return (

    <div className="flex h-screen flex-col overflow-hidden font-sans">

      <div
        className="flex flex-1 flex-col bg-cover bg-center p-8 text-white"
        style={{ backgroundImage: `url(${bgImage})` }}>


        <div className="flex flex-1 items-center justify-center text-center">
          <h1 className="text-3xl font-semibold w-3xl text-white drop-shadow-md md:text-5xl">
            Bring Nature Home Nurture, Decorate, Thrive with GreenNest
          </h1>
        </div>
      </div>

      {/* Bottom Light Green Section */}
      <div className="flex items-center justify-center bg-green-50 py-8">
        <button className="rounded bg-green-700 px-8 py-3 font-bold text-white shadow-md transition hover:-translate-y-1 hover:bg-green-800 hover:shadow-lg">
          PURCHASE THEME
        </button>
      </div>
    </div>


  );
};

export default HomePage;