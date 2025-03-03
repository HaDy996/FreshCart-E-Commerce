import React, { useContext, useState } from 'react'
import styles from './Checkout.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { SyncLoader } from 'react-spinners';
import { cartContext } from '../../context/cartContext';




export default function Checkout() {
  let [isCallingAPI, setIsCallingAPI] = useState(false)
  let [apiError, setApiError] = useState(null)
  let [isOnline, setIsOnline] = useState(false)
  let { cashOnDelivery, onlinePayment } = useContext(cartContext)

  //! htmlFormik Package To handle :
  // - Getting values in and out of htmlForm state
  // - Validation and error messages
  // - Handling htmlForm submite and prevent refresh from submite  

  const initialValues = {
    details: '',
    phone: '',
    city: ''
  }

  const validationSchema = Yup.object().shape({
    details: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
  })

  //! 1- 
  const shippingForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callPayment,
  })


  async function callPayment(values) {
    console.log(isOnline);

    try {
      setIsCallingAPI(true)
      if (isOnline) {
        let x = await onlinePayment(values)
        console.log(x,"Response from onlinePayment");
        setIsCallingAPI(false)
        window.location.href = x.session.url
      } else {
        let x = await cashOnDelivery(values)
        console.log(x, "Response from cashOnDelivery");
        setIsCallingAPI(false)
      }

    } catch (error) {
      setIsCallingAPI(false)
    }
  }




  return (
    <div>
      <form onSubmit={shippingForm.handleSubmit} class="w-3/4 mx-auto my-20">
        <h1 className='text-5xl mb-7 font-extrabold text-main font-mono'>Checkout</h1>
        <h2 className='text-2xl mb-7 font-extrabold text-main font-mono'>Shipping Info:</h2>
        {apiError ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apiError}
        </div> : ''}

        <div className="relative z-0 w-full mb-5 group mt-[30px]">
          <input type="text" name="details" value={shippingForm.values.details} onBlur={shippingForm.handleBlur} onChange={shippingForm.handleChange} id="details" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
          <label htmlFor="details" className="peer-focus:font-medium absolute text-base font-extrabold text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details :</label>
          {shippingForm.errors.details && shippingForm.touched.details ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {shippingForm.errors.details}
          </div> : null}
        </div>
        <div className="relative z-0 w-full mb-5 group mt-[30px]">
          <input type="tel" name="phone" value={shippingForm.values.phone} onBlur={shippingForm.handleBlur} onChange={shippingForm.handleChange} id="phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
          <label htmlFor="phone" class="peer-focus:font-medium absolute text-base font-extrabold text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone :</label>
          {shippingForm.errors.phone && shippingForm.touched.phone ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {shippingForm.errors.phone}
          </div> : null}
        </div>
        <div class="relative z-0 w-full mb-5 group mt-[30px]">
          <input type="text" name="city" value={shippingForm.values.city} onBlur={shippingForm.handleBlur} onChange={shippingForm.handleChange} id="city" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
          <label htmlFor="city" class="peer-focus:font-medium absolute text-base font-extrabold text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City :</label>
          {shippingForm.errors.city && shippingForm.touched.city ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {shippingForm.errors.city}
          </div> : null}
        </div>

        <div className="relative z-0 w-full mb-5 group mt-[30px]">
          <input onChange={() => { setIsOnline(true) }} type="checkbox" className='rounded cursor-pointer checked:text-main focus:ring-offset-white focus:ring-0 focus:ring-offset-0 ' />
          <label htmlFor="" className='ms-3 font-bold'>Online</label>
        </div>

        {isCallingAPI ? <div className='flex justify-end p-3 mb-2'>
          <SyncLoader
            color="#0aad0a"
            loading
            margin={4}
            size={12}
          />
        </div> : <button type="submit" className="text-white opacity-75 bg-main block ml-auto focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-md w-full sm:w-auto px-10 py-2 text-center dark:bg-main dark:hover:bg-blend-multiply dark:focus:ring-main font-mono text-2xl hover:scale-110 transition-all">Pay Now</button>
        }


      </form>

    </div>
  )
}
