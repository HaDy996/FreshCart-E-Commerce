import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RelatedProducts from './components/RelatedProducts/RelatedProducts';
import Slider from "react-slick";
import Loader from '../Shared/Loader/Loader';
import { cartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';
import { SyncLoader } from 'react-spinners'




export default function ProductDetails() {

  const [details, setDetails] = useState(null)
  const { addToCart } = useContext(cartContext)
  const { id, categoryId } = useParams()
  const [loading, setLoading] = useState(false); //^ Loading state for Add to Cart button
  console.log(id);

  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnDotsHover: true,
    pauseOnFocus: true

  };


  async function addProductToCart(id) {
    setLoading(true) // start loading
    let data = await addToCart(id)
    if (data.status == "success") {
      toast.success("Product Added to Cart Successfully", { position: "top-center", theme: "colored", type: "success", autoClose: 800 });
    }
    setLoading(false) // stop loading

  }


  function getProductDetails() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        console.log(data, "product Details");
        setDetails(data.data)
      })
      .catch(err => {
        console.log(err);

      })

  }

  useEffect(() => {
    document.body.style.overflow = "auto";
    getProductDetails()
  }, [id])

  return (
    <>
      {!details && <Loader />}
      {details && <div className='main-Layout py-20 flex items-center'>
        <div className="w-1/3 border-x-[4px] rounded-lg border-main">
          <Slider {...settings}>
            {details?.images.map((src) => <img src={src} alt={details?.title} className='rounded-lg' />)}
          </Slider>
        </div>
        <div className="w-2/3 ps-10">
          <h1 className='font-bold text-4xl mb-4'>{details?.title}</h1>
          <p className='mb-2'>{details?.description}</p>
          <span className='text-main font-semibold'>{details?.category?.name}</span>
          <div className="flex justify-between mb-4 mt-2">
            <p className='font-bold text-2xl'>{details?.price} EGP</p>
            <p className='text-xl font-bold'>
              <i className='fa fa-star rating-color'></i>
              {details?.ratingsAverage}</p>
          </div>
          <button onClick={() => addProductToCart(details.id)}
            className='bg-main text-white p-5 rounded-lg mt-2 font-semibold w-full text-2xl hover:text-3xl hover:transition-all transition-all'
            disabled={loading} //^ button Disabled while loading
          >
            {loading ?
              <div className='flex p-3 mb-2 justify-center'>
                <SyncLoader
                  color="white"
                  loading
                  margin={4}
                  size={10}
                />
              </div>
              : "Add to Cart"}
          </button>
        </div>
      </div>}


      <h2 className='font-bold text-3xl text-center bg-main text-white p-2 mb-10 mx-auto'>Related Products</h2>
      <RelatedProducts categoryId={details?.category?._id} productID={id} />
    </>
  )
}
