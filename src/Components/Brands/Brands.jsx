import React, { useEffect, useState } from 'react'
import styles from './Brands.module.css'
import axios from 'axios';
import Loader from '../Shared/Loader/Loader';
import { useNavigate } from 'react-router-dom';


export default function Brands() {
  const [allBrands, setAllBrands] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();




  useEffect(() => {
    getBrands();
  }, [])


  //^ Fetching Brands
  async function getBrands() {
    try {
      setLoading(true)
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      // console.log(data.data);
      setAllBrands(data.data)
      setLoading(false)
    } catch (error) {
      console.log(error, "Error in Fetching Brands");
    }

  }
    //^ Handle Click on brand Card
  const handleBrandClick = (brandId) => {
    navigate(`/brands/${brandId}`); // Navigate to a dynamic route
  };

  

  if(loading) {
    return <Loader />
  };


  return (
    <>
      <div className="container mx-auto py-10 flex justify-center">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6'>
          {allBrands.map((brand) => (
            <div
              key={brand._id}
              className='p-4 rounded-lg shadow-xl bg-white dark:bg-gray-800 hover:shadow-[0_0_30px_rgba(10,173,10,0.3)] hover:border-x-[4px] hover:border-main transition-all duration-300 transform hover:-translate-y-2 cursor-pointer'
              onClick={() => handleBrandClick(brand._id)}
            >
              <img
                className='w-full h-48 object-cover rounded-t-lg'
                src={brand.image}
                alt={brand.name}
              />
              <h3 className='text-center text-lg font-semibold mt-4 text-gray-800 dark:text-gray-200 hover:text-main dark:hover:text-main transition-colors duration-300'>
                {brand.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
