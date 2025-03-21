import React, { useContext, useState } from 'react';
import styles from './Checkout.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SyncLoader } from 'react-spinners';
import { cartContext } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';

export default function Checkout() {
  let [isCallingAPI, setIsCallingAPI] = useState(false);
  let [apiError, setApiError] = useState(null);
  let [isOnline, setIsOnline] = useState(false); // true for online payment, false for COD
  let { cashOnDelivery, onlinePayment } = useContext(cartContext);
  const navigate = useNavigate();

  // Formik setup for shipping details
  const initialValues = {
    details: '',
    phone: '',
    city: '',
  };

  const validationSchema = Yup.object().shape({
    details: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
  });

  const shippingForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callPayment,
  });

  async function callPayment(values) {
    try {
      setIsCallingAPI(true);
      setApiError(null); // Clear previous errors

      if (isOnline) {
        // Handle online payment
        let response = await onlinePayment(values);
        console.log(response, 'Response from onlinePayment');
        setIsCallingAPI(false);
        window.location.href = response.session.url; // Redirect to payment gateway
      } else {
        // Handle Cash on Delivery (COD)
        let response = await cashOnDelivery(values);
        console.log(response, 'Response from cashOnDelivery');
        setIsCallingAPI(false);


        // Show success message for COD
        if (response && response.status === 'success') {
          toast.success('Order placed successfully! Pay cash upon delivery.', {
            position: 'top-right',
            autoClose: 5000, // Close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored"
          });
          setTimeout(() => {
            navigate('/'); // Redirect to home page after 5 seconds
          }, 5000);
        } else {
          setApiError('Failed to place order. Please try again.');
        }
      }
    } catch (error) {
      setIsCallingAPI(false);
      setApiError('An error occurred. Please try again.');
      console.error('Error during payment:', error);
    }
  }

  return (
    <div>
      <form onSubmit={shippingForm.handleSubmit} className="w-3/4 mx-auto my-20">
        <h1 className="text-5xl mb-7 font-extrabold text-main font-mono">Checkout</h1>
        <h2 className="text-2xl mb-7 font-extrabold text-main font-mono">Shipping Info:</h2>

        {/* Display API errors */}
        {apiError && (
          <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {apiError}
          </div>
        )}

        {/* Shipping Details Form */}
        <div className="relative z-0 w-full mb-5 group mt-[30px]">
          <input
            type="text"
            name="details"
            value={shippingForm.values.details}
            onBlur={shippingForm.handleBlur}
            onChange={shippingForm.handleChange}
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-base font-extrabold text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Details :
          </label>
          {shippingForm.errors.details && shippingForm.touched.details && (
            <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              {shippingForm.errors.details}
            </div>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group mt-[30px]">
          <input
            type="tel"
            name="phone"
            value={shippingForm.values.phone}
            onBlur={shippingForm.handleBlur}
            onChange={shippingForm.handleChange}
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-base font-extrabold text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone :
          </label>
          {shippingForm.errors.phone && shippingForm.touched.phone && (
            <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              {shippingForm.errors.phone}
            </div>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group mt-[30px]">
          <input
            type="text"
            name="city"
            value={shippingForm.values.city}
            onBlur={shippingForm.handleBlur}
            onChange={shippingForm.handleChange}
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-base font-extrabold text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            City :
          </label>
          {shippingForm.errors.city && shippingForm.touched.city && (
            <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              {shippingForm.errors.city}
            </div>
          )}
        </div>

        {/* Payment Options */}
        <div className="relative z-0 w-full mb-5 group mt-[30px]">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="payment"
              checked={isOnline}
              onChange={() => setIsOnline(true)}
              className="rounded cursor-pointer focus:ring-0 text-main"
            />
            <span className="ms-3 font-bold">Online Payment</span>
          </label>
          <label className="flex items-center cursor-pointer mt-3">
            <input
              type="radio"
              name="payment"
              checked={!isOnline}
              onChange={() => setIsOnline(false)}
              className="rounded cursor-pointer focus:ring-0 text-main"
            />
            <span className="ms-3 font-bold">Cash on Delivery (COD)</span>
          </label>
        </div>

        {/* Submit Button */}
        {isCallingAPI ? (
          <div className="flex justify-end p-3 mb-2">
            <SyncLoader color="#0aad0a" loading margin={4} size={12} />
          </div>
        ) : (
          <button
            type="submit"
            className="text-white text-xl opacity-75 bg-main block ml-auto focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-md w-full sm:w-auto px-10 py-2 text-center hover:scale-110 transition-all"
          >
            {isOnline ? 'Pay Now' : 'Place Order (COD)'}
          </button>
        )}
      </form>
    </div>
  );
}
