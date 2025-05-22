import React, { useEffect, useState } from 'react'
import styles from './PopularCategories.module.css'
import Slider from "react-slick";
import axios from 'axios';



export default function PopularCategories() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const [catogories, setCatogories] = useState([])

  async function getCategories() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      // console.log(data);
      setCatogories(data.data)
    } catch (error) {

    }
  }

  useEffect(() => {
    getCategories()
  }, [])
  return (
    <div className='py-5 my-16'>
      <h2 className='text-main text-2xl mb-6 font-bold border-x-[3.5px] border-main px-2 rounded-md inline-block'>Shop Popular Categories</h2>
      <Slider {...settings}>
        {catogories.map((catogory) => <div>
          <img src={catogory.image} alt={catogories?.title} className='categoryImage' />
          <h4 className='text-center dark:text-white'>{catogory.name}</h4>
        </div>)}
      </Slider>
    </div>
  )
}
