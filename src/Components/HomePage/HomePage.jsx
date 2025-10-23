import React from 'react';
import HeroSection from './HeroSection';
import TopRatedPlants from './TopRatedPlants';
import PlantCareTips from './PlantCareTips';
import MeetOurExperts from './MeetOurExperts';
import EcoDecorIdeas from './EcoDecorIdeas';
import PlantOfTheWeek from './PlantOfTheWeek';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <HeroSection />
      <TopRatedPlants />
      <PlantCareTips />
      <MeetOurExperts />
      <EcoDecorIdeas />
      <PlantOfTheWeek />
      
    </div>


  );
};

export default HomePage;