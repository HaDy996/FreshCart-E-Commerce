import React, { useContext, useEffect, useState } from 'react'
import styles from './Wishlist.module.css'
import { WishlistContext } from '../../context/WishlistContext';
import Loader from '../Shared/Loader/Loader';
import { SyncLoader } from 'react-spinners';
import { cartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';


export default function Wishlist() {
  const { wishlist, getUserWishlist, removeFromWishlist, isLoading} = useContext(WishlistContext)
  const { addToCart } = useContext(cartContext)
  const [loadingRemove, setLoadingRemove] = useState({});//^ Loading state for remove button
  const [loadingCart, setLoadingCart] = useState({});//^ Loading state for adding to cart button



  //^ Rmove item form wishlist
  async function removeItem(id) {
    setLoadingRemove((prev) => ({ ...prev, [id]: true }));//^ set loading for this product
    await removeFromWishlist(id);
    // console.log(data);
    setLoadingRemove((prev) => ({ ...prev, [id]: false })); //^ reset loading after request

  }


  async function addingToCart(id) {
    try {
      setLoadingCart((prev) => ({ ...prev, [id]: true }));//^ set loading for this product
      await addToCart(id); //Call the API to add product to cart
      setLoadingCart((prev) => ({ ...prev, [id]: false })); //^ reset loading after request
      toast.success("Product added to Cart Successfully", { position: "bottom-right", theme: "colored" })
      await removeFromWishlist(id); //Remove product from wishlist immediately
    } catch (error) {
      toast.error("Failed to add product. Try again!", { position: "top-center", theme: "colored" });
      console.error("Error adding product to cart:", error);
    }
  }

  useEffect(() => {
    if (wishlist) {
      getUserWishlist();
    }

  }, [])



  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <Loader />
      </div>
    );
  } else if (wishlist.length == 0) {
    return (
      <div className='text-center bg-main text-white font-mono rounded-2xl my-36 py-20'>
        <h1 className='text-5xl my-2'>
          <i className="fa-solid fa-heart fa-lg me-5 text-white"></i> Your Wishlist is Empty
        </h1>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-4xl my-2 text-main font-bold border-x-[3.5px] border-main rounded-md inline-block px-2">My Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {wishlist.map((product) => (
          <div key={product.id} className="p-4 rounded-lg shadow-xl">
            <img src={product.imageCover} alt={product.title} className="w-full  object-fill rounded" />
            <h3 className="text-lg font-semibold mt-2">
              {product.title ? product.title.split(" ").slice(0, 3).join(" ") : "No Title"}
            </h3>
            <p className="text-gray-600 font-bold mt-2 text-lg">{product.price} <span className='text-main text-base'>EGP</span></p>
            <div className='flex mt-3'>
              <button
                onClick={() => removeItem(product.id)}
                className="font-medium text-white flex mx-auto items-center bg-red-600 px-1 py-1 rounded transition-all duration-200  hover:scale-105 w-1/3 me-3 "
                disabled={loadingRemove[product.id]} //Disable button while loading
              >
                {loadingRemove[product.id] ?
                  <div className='flex items-center justify-center w-full'>
                    <SyncLoader
                      color="white"
                      loading
                      margin={4}
                      size={8}
                    />
                  </div>
                  :
                  <div className='flex items-center justify-center w-full'>
                    <i className="fa-solid fa-trash-can text-white me-2 text-xl text-center"></i>
                  </div>
                }
              </button>
              <button
                onClick={() => {
                  addingToCart(product.id)
                }}
                className="font-medium text-white flex mx-auto items-center bg-main px-1 py-1 rounded transition-all duration-200  hover:scale-105 w-2/3  "
                disabled={loadingCart[product.id]}
              >
                {loadingCart[product.id] ?
                  <div className='flex items-center justify-center w-full'>
                    <SyncLoader
                      color="white"
                      loading
                      margin={4}
                      size={8}
                    />
                  </div>
                  :
                  <div className='flex items-center justify-center w-full'>
                    <i className="fa-solid fa-cart-plus text-white me-2 text-xl"></i>
                    <span>Add to Cart</span>
                  </div>
                }
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

