import React, { useContext, useEffect, useState } from 'react'
import styles from './Home.module.css'
import { counterContext } from '../../context/CounterContext';
import RecentProducts from './components/RecentProducts/RecentProducts';
import PopularCategories from './components/PopularCategories/PopularCategories';
import StaticSlider from './components/StaticSlider/StaticSlider';


export default function Home() {

  return (
    <>
      <div className="mx-auto">
        <div className='border-x-[5px] border-main rounded-lg px-2'>
          <StaticSlider />
        </div>
        <div className=''>
          <PopularCategories />
        </div>
        <div className=''>
          <RecentProducts />
        </div>
      </div>
    </>
  )
}
