import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './AllOrders.module.css'
import { cartContext } from '../../context/cartContext';
import { tokenContext } from '../../context/tokenContext';
import { jwtDecode } from 'jwt-decode';
import { Modal } from 'flowbite';
import Loader from '../Shared/Loader/Loader';
import { useNavigate } from "react-router-dom";
import SharedModal from '../SharedModal/SharedModal';



export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderTotalPrice, setOrderTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // state for Loading orderDetails Modal
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false)// state for Loading all orders

  let { getUserOrders } = useContext(cartContext)
  let { token } = useContext(tokenContext)


  //^ function to Open Orderdetails modal:
  function openModal(items, totalPrice) {
    setIsLoading(true);  // Show loader
    setSelectedItems([]);
    setOrderTotalPrice(totalPrice);

    setTimeout(() => {
      setSelectedItems(items);
      setIsLoading(false);  // Hide loader after data loads
    }, 300); // Simulate loading time
    document.body.style.overflow = "hidden"; //Prevent background scroll
    setIsModalOpen(true); //! Show modal
  }

  //^ function to Close details modal:
  function closeModal() {
    document.body.style.overflow = "auto"; //Restore scrolling
    setIsModalOpen(false); //! Hide modal
  }

  //! To get UserId inside "token"
  function getId() {
    let decoded = jwtDecode(token)
    console.log(decoded, "Decoded userId");
    getOrders(decoded.id)

  }

  async function getOrders(id) {
    try {
      setOrdersLoading(true)
      let data = await getUserOrders(id)
      // console.log(data);
      setOrders(data)
      setOrdersLoading(false)
      return data
    } catch (error) {

    }
  }

  useEffect(() => {
    token && getId()
  }, [token])


  if (ordersLoading) {
    return <Loader />
  }else if (orders.length === 0) {
    return (
      <div className='text-center bg-main text-white font-mono rounded-2xl my-36 py-20'>
        <h1 className='text-5xl my-2'>
          <i class="fa-solid fa-truck-fast text-white text-8xl"></i> There Are no Orders to View
        </h1>
      </div>
    )
  }


  return (
    <>
      <div className="relative overflow-x-auto my-14 font-mono">
        <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xl text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Payed?
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                payment Method
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                total Order Price
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                View Details
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order =>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-main text-lg">
                <th scope="row" className="px-6 py-4  text-main font-bold whitespace-nowrap dark:text-white text-start ">
                  <span className='border-[2px] border-main px-3 py-1 rounded-md '>{order.id}</span>
                </th>
                <td className="px-6 py-4 font-semibold text-center text-gray-700">
                  {order.isPaid ? 'Paid' : 'Not Paid'}
                </td>
                <td className="px-6 py-4 text-black font-bold text-center">
                  {order.paymentMethodType}
                  {order.paymentMethodType === 'cash' ? <i class="fa-regular fa-money-bill-1 ms-3"></i> : <i className="fa-solid fa-credit-card ms-3"></i>}
                </td>
                <td className="px-6 py-4 font-extrabold text-center text-main text-xl">
                  {order.totalOrderPrice}
                </td>
                <td className="px-6 py-4 font-extrabold text-center text-gray-700 flex justify-center">
                  <button onClick={() => openModal(order.cartItems, order.totalOrderPrice)} className="block text-white bg-main  focus:ring-4 focus:outline-none focus:ring-gray-500 font-bol rounded-lg text-sm px-5 py-2 text-center hover:scale-110 transition-all" type="button">
                    <i className="fa-solid fa-circle-info text-white me-2"></i>
                    Details
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      <div>
        {/*! OrderDetails Modal */}
        {isModalOpen && <SharedModal closeModal={closeModal} selectedItems={selectedItems} orderTotalPrice={orderTotalPrice} isLoading={isLoading} />}
      </div>
    </>
  )
}
