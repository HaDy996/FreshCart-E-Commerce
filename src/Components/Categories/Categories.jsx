
import React, { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import axios from 'axios';
import Loader from '../Shared/Loader/Loader';
import { useNavigate } from 'react-router-dom';

export default function Categories() {
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories();
  }, []);

  //^ Fetch Categories
  async function getAllCategories() {
    try {
      setLoading(true);
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setAllCategories(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error, "Error in Fetching Categories");
    }
  }

  //^ Handle Click on Category Card
  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`); // Navigate to a dynamic route
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h2 className=' border-x-[4px] px-3 border-main text-main text-4xl font-extrabold rounded-lg inline-block mx-auto'>Popular Categories</h2>
      <div className="container mx-auto py-10 flex justify-center">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-6'>
          {allCategories.map((category) => (
            <div
              key={category._id} // unique key for each category
              className='p-4 rounded-lg shadow-xl bg-white hover:shadow-[0_0_30px_rgba(10,173,10,0.3)] hover:border-x-[4px] hover:border-main transition-all duration-300 transform hover:-translate-y-2 cursor-pointer'
              onClick={() => handleCategoryClick(category._id)}
            >
              <img
                className='w-full h-5/6 object-cover rounded-t-lg'
                src={category.image}
                alt={category.name}
              />
              <h3 className='text-center text-lg font-semibold mt-4 text-gray-800 hover:text-main transition-colors duration-300'>
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}