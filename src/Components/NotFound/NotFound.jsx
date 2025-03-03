import React, { useEffect, useState } from 'react'
import styles from './NotFound.module.css'
import NotFoundImage from '../../assets/images/error.svg'

export default function NotFound() {
    const [count,setCount] = useState(0);
  return (
    <div className='container'>
      <img src={NotFoundImage} className='w-screen' alt="NotFound" />
    </div>
  )
} 
