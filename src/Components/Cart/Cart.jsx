import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { cartContext } from '../../context/cartContext';
import Loader from '../Shared/Loader/Loader';
import { SyncLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'animate.css'

export default function Cart() {
  const { cartDetails, numOfCartItems, removeProduct, updateProductCount, getCart, headers } = useContext(cartContext);
  const navigate = useNavigate();
  const token = headers
  let [loading, setLoading] = useState({}); //^ Loading state
  const [clearCartLoading, setClearCartLoading] = useState(false); //^ state for cleared cart


  async function deleteProduct(id) {
    setLoading((prev) => ({ ...prev, [id]: true }));//^ set loading for this product
    let data = await removeProduct(id);
    // console.log(data);
    setLoading((prev) => ({ ...prev, [id]: false })); //^ reset loading after request

  }
  async function updateItems(id, count) {
    let data = await updateProductCount(id, count);
    console.log(data);

  }
  //^ Navigate to ProductDetails when click on Product
  function showProductDetails(productId, categoryId) {
    if (!categoryId || !productId) {
      console.error("Missing categoryId or productId:");
      return;
    }
    navigate(`/productDetails/${productId}/${categoryId}`)
  }

  //^Clear Cart
  async function ClearCart() {
    if (!window.confirm("Are you sure you want to clear your cart?")) return;

    try {
      setClearCartLoading(true);
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
      await getCart();
      toast.success("Cart cleared successfully", { position: "bottom-center" });
      setClearCartLoading(false);

    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart", { position: "bottom-center" });
      setClearCartLoading(false);
    }
  }

  useEffect(() => {
    if (cartDetails) {
      setLoading(true)
      getCart() //^ Fetch cartDetails whenever Cart Component is mounted
      // console.log(cartDetails);
      setLoading(false)
    }
  }, []);

  //^ make sure cartDetails and 'cartDetails.data' exist before rendering
  if (!cartDetails || !cartDetails.data) {
    return <>
      {<Loader />}
    </>
  } else if (numOfCartItems == 0) {
    return <div className='text-center bg-main text-white font-mono rounded-2xl my-36 py-20'>
      <h1 className=' text-5xl my-2'><i class="fa-solid fa-cart-shopping fa-lg me-5 text-white"></i>Your Cart is Empty</h1>
      <h2 className='text-2xl mt-3 text-white'>Please Add Some Products</h2>
    </div>
  }

  return (
    <>
      <div className="py-7">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-lg text-white text-center uppercase bg-main dark:bg-main dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3 text-start  ">Product</th>
                <th scope="col" className="px-6 py-3 ">Qty</th>
                <th scope="col" className="px-6 py-3 ">Price</th>
                <th scope="col" className="px-6 py-3 ">Total</th>
                <th scope="col" className="px-6 py-3 ">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartDetails.data.products?.map((product) => (
                <tr key={product.product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 align-middle">
                  <td className="p-4">
                    <img onClick={() => showProductDetails(product.product.id, product.product.category?._id)} src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full border-x-2 border-main rounded cursor-pointer" alt={product.product.title} />
                  </td>
                  <td>
                    <span onClick={() => showProductDetails(product.product.id, product.product.category?._id)} className='px-6 py-4 font-semibold text-gray-900 dark:text-white text-base cursor-pointer'>{product.product.title}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        className="flex items-center justify-center h-6 w-6 text-white bg-main border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        onClick={() => updateItems(product.product._id, product.count - 1)}
                      >
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                        </svg>
                      </button>

                      <span className="text-xl font-semibold w-4 text-center">{product.count}</span>

                      <button
                        className="flex items-center justify-center h-6 w-6 text-white bg-main border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        onClick={() => updateItems(product.product._id, product.count + 1)}
                      >
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white  text-center ">
                    <span className='border-[3px] py-1 px-2 border-main rounded text-xl border-dashed'>{product.price}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white  text-center ">
                    <span className='border-[3px] py-1 px-2 border-[red] rounded text-xl border-dashed'>{(product.price) * (product.count)}</span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteProduct(product.product._id)}
                      className="font-medium text-white flex mx-auto items-center bg-red-600 px-4 py-3 rounded transition-all duration-200  hover:scale-110 "
                      disabled={loading[product.product._id]}
                    >
                      {loading[product.product._id] ?
                        <div className='flex mb-2 justify-center'>
                          <SyncLoader
                            color="white"
                            loading
                            margin={4}
                            size={8}
                          />
                        </div>
                        : <>
                          <i class="fa-solid fa-trash-can text-white me-2"></i>
                          Remove
                        </>}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex my-5 justify-between items-center">
        <h2 className="text-2xl font-extrabold">
          Total Products Count : <span className="text-5xl text-main border-x-[4px] border-main rounded-lg px-3 ms-3 font-mono">{numOfCartItems}</span>
        </h2>
        <h2 className="text-2xl font-extrabold ">
          Total Price : <span className="text-5xl me-2 rounded-lg px-3 font-mono border-x-[4px] border-main">{cartDetails.data?.totalCartPrice || 0}</span> <span className='text-main'>EGP</span>
        </h2>




      </div>
      <div className='flex flex-col justify-center items-center'>
        <button
          onClick={() => {
            ClearCart()
            toast.success("Cart Cleared Successfully, Your Cart Is Empty Now")
          }}
          className=" mt-20 uppercase font-medium text-white text-xl flex items-center justify-center bg-red-600 py-3 px2 rounded-lg transition-all duration-200 hover:scale-105 w-full md:w-1/4"
          disabled={clearCartLoading}
        >
          {clearCartLoading ? (
            <div className='flex mb-2 justify-center'>
              <SyncLoader
                color="white"
                loading
                margin={4}
                size={8}
              />
            </div>
          ) : (
            <>
              <i className="fa-solid fa-trash-can text-white me-2"></i>
              Clear Cart
            </>
          )}
        </button>

        <Link to={'/Checkout'} className='bg-main text-white mt-8 py-4 block text-center text-3xl font-extrabold rounded-lg hover:scale-105 transition-all px-5 w-full md:w-1/3 mx-auto animated-text uppercase'> CheckOut</Link>
      </div>

    </>
  );
}
