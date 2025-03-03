import React, { useEffect, useState } from 'react'
import styles from './StaticSlider.module.css'
import Slider from 'react-slick';
import slide1 from '../../../../assets/images/slider-image-1.jpeg'
import slide2 from '../../../../assets/images/slider-image-2.jpeg'
import slide3 from '../../../../assets/images/slider-image-3.jpeg'
import static1 from '../../../../assets/images/grocery-banner.png'
import static2 from '../../../../assets/images/grocery-banner-2.jpeg'

export default function StaticSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,

  };

  useEffect(() => {

  }, [])
  return (
    <div className='main-Layout flex flex-col md:flex-row items-center z-0'>
      <div className=" w-full md:w-8/12 ">
        <Slider {...settings}>
          <img src={slide1} className='h-[400px] w-full' alt="" />
          <img src={slide2} className='h-[400px] w-full' alt="" />
          <img src={slide3} className='h-[400px] w-full' alt="" />
        </Slider>
      </div>
      <div className="w-full md:w-4/12 flex flex-col ">
        <img src={static1} className='h-[200px]' alt="" />
        <img src={static2} className='h-[200px]' alt="" />
      </div>
    </div>
  )
}




