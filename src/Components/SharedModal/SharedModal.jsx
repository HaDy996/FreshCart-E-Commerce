import React, { useEffect, useState } from 'react'
import styles from './SharedModal.module.css'
import Loader from '../Shared/Loader/Loader';
import { useNavigate } from 'react-router-dom';


export default function SharedModal({ closeModal, selectedItems, orderTotalPrice, isLoading }) {
  const navigate = useNavigate();

  useEffect(() => {

  }, [])

  //^ Navigate to ProductDetails when click on Product
  function showProductDetails(productId, categoryId) {
    if (!categoryId || !productId) {
      console.error("Missing categoryId or productId:");
      return;
    }
    navigate(`/productDetails/${productId}/${categoryId}`)
  }
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-lg">
      <div className="relative p-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-custom">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 border-y-[5px] border-main">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-3xl font-extrabold text-main dark:text-white border-x-[4px] border-main px-3 rounded-lg">
              Order Details
            </h3>
            <button onClick={closeModal} type="button" className="text-black bg-transparent hover:bg-main hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white transition-all">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">

            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-lg text-white uppercase bg-main dark:bg-main dark:text-white rounded-lg">
                <tr>
                  <th scope="col" className="px-16 py-3"><span className="sr-only">Image</span></th>
                  <th scope="col" className="px-6 py-3">Product</th>
                  <th scope="col" className="px-6 py-3 text-center">Qty</th>
                  <th scope="col" className="px-6 py-3 text-center">Price</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6"><Loader /></td>
                  </tr>
                ) : (
                  selectedItems.map((product) => (
                    <tr key={product.product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 align-middle">
                      <td className="p-4">
                        <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full border-x-2 border-main rounded" alt={product.product.title} />
                      </td>
                      <td onClick={() => showProductDetails(product.product.id, product.product.category?._id)} className="px-6 py-4 font-semibold text-black dark:text-white text-base cursor-pointer">
                        {product.product.title}
                      </td>
                      <td className="px-6 py-4 font-semibold text-main dark:text-white text-base text-center">
                        <span className="text-xl font-semibold w-4 text-center">{product.count}</span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-lg text-center">
                        {product.price}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Total Price: <span className="text-main me-3 text-3xl">{orderTotalPrice}</span> EGP
            </h3>
            <button onClick={closeModal} className='bg-main text-white text-lg font-extrabold font-mono uppercase block px-20 py-2 rounded-lg mx-auto'>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
