import React, { useEffect, useState } from 'react'
import styles from './LayOut.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer'


export default function LayOut() {
  return (
    <div>
      <Navbar />
      <div className='container pt-[94px] relative '>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
