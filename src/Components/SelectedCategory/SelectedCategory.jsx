import React, { useEffect, useState } from 'react';
import styles from './SelectedCategory.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../Shared/Loader/Loader';

export default function SelectedCategory() {
  const { categoryId } = useParams();
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategoryDetails(categoryId);
  }, [categoryId]);

  const fetchCategoryDetails = async (categoryId) => {
    try {
      setLoading(true)
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`);
      setCategoryDetails(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error, "Error in Fetching Category Details");
      setError("Failed to fetch category details. Please try again later.");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }



  return (
    <div className="container mx-auto py-10">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-main border-x-[4px] inline-block px-4 border-main rounded-lg mb-10">{categoryDetails.name}</h1>
        <img
          src={categoryDetails.image}
          alt={categoryDetails.name}
          className=" h-64 object-cover mt-6 rounded-lg mx-auto"
        />
      </div>
    </div>
  );
}