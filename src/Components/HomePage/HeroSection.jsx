import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import bgImage1 from '../../assets/hero7.avif';
import bgImage2 from '../../assets/hero6.jpg';
import bgImage3 from '../../assets/hero5.jpg';

const HeroSection = () => {
  const slides = [
    {
      image: bgImage1,
      slogan: 'Bring Nature Home with GreenNest',
    },
    {
      image: bgImage2,
      slogan: 'Nurture Your Space with Lush Greenery',
    },
    {
      image: bgImage3,
      slogan: 'Thrive with Plants, Thrive with Us',
    },
  ];

  return (
    <div className="flex flex-col w-full h-[80vh]  text-white">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={2000}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="flex items-center justify-center text-center bg-cover bg-center h-full w-full"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black opacity-60"></div>

              <div className="relative z-10 flex items-center justify-center h-full w-full">
                <h1 className="text-3xl font-semibold w-full max-w-3xl text-white drop-shadow-md md:text-5xl px-8">
                  {slide.slogan}
                </h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );


};

export default HeroSection;
