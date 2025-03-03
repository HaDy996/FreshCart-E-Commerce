import React, { useEffect, useState } from 'react'
import styles from './Loader.module.css'
import loaderImg from '../../../assets/images/Animation - 1739193241402.gif'

export default function Loader() {
  const [count, setCount] = useState(0);

  useEffect(() => {

  }, [])


  return(
    <div className='flex justify-center'>
      <img src={loaderImg} alt="" />
    </div>
  )

}