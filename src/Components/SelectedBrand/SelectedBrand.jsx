import React, { useEffect, useState } from 'react'
import styles from './SelectedBrand.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Loader from '../Shared/Loader/Loader';

export default function SelectedBrand() {
  const { brandId } = useParams();
  const [brandDetails, setBrandDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrandDetails(brandId);
  }, [brandId]);

  const fetchBrandDetails = async (brandId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
      setBrandDetails(data.data);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching brand details:", error);
      setError("Failed to fetch brand details. Please try again later.");
      setLoading(false);

    }
  };

  if (loading) {
    return <Loader />;
  }

  

  if (!brandDetails) {
    return <div className="container mx-auto py-10 text-center">No brand details found.</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-main border-x-[4px] inline-block px-4 border-main rounded-lg mb-10">
          {brandDetails.name} Products
        </h1>
        <img
          src={brandDetails.image}
          alt={brandDetails.name}
          className="h-64 object-cover mt-6 rounded-lg mx-auto"
        />
      </div>
    </div>
  );
}