import React, { useContext, useEffect, useState } from 'react'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { SyncLoader } from 'react-spinners'
import { tokenContext } from '../../context/tokenContext'


export default function Login() {
  let [isCallingAPI, setIsCallingAPI] = useState(false)
  let [apiError, setApiError] = useState(null)
  let navigate = useNavigate()
  let { setToken } = useContext(tokenContext)

  //! Formik Package To handle :
  // - Getting values in and out of form state
  // - Validation and error messages
  // - Handling form submite and prevent refresh from submite  

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email Address').required("Required"),
    password: Yup.string().matches(new RegExp('^[A-Z][a-z0-9]{3,8}$'), 'Invalid Password').required("Required"),
  })

  //! 1- 
  const loginForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callLogin,
  })


  async function callLogin(values) {
    try {
      setIsCallingAPI(true)
      setApiError(null)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      localStorage.setItem('userToken', data.token)
      setToken(data.token)
      setIsCallingAPI(false)
      navigate("/home") // programatic Routing
    } catch (error) {
      setApiError(error.response.data.message)
      setIsCallingAPI(false)

    }
  }




  return (
    <div>
      <form onSubmit={loginForm.handleSubmit} class="w-3/6 mx-auto my-20">
        <h1 className='text-5xl mb-7 font-extrabold text-main font-mono border-x-[4px] border-main rounded-lg px-3 inline-block'>Login</h1>
        {apiError ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apiError}
        </div> : ''}

        <div class="relative z-0 w-full mb-5 group">
          <input type="email" name="email" value={loginForm.values.email} onBlur={loginForm.handleBlur} onChange={loginForm.handleChange} id="Email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
          <label for="Email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email :</label>
          {loginForm.errors.email && loginForm.touched.email ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {loginForm.errors.email}
          </div> : null}
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input type="password" name="password" value={loginForm.values.password} onBlur={loginForm.handleBlur} onChange={loginForm.handleChange} id="Password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
          <label for="Password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password :</label>
          {loginForm.errors.password && loginForm.touched.password ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {loginForm.errors.password}
          </div> : null}
        </div>

        {isCallingAPI == true ? <div className='flex justify-end p-3 mb-2'>
          <SyncLoader
            color="#0aad0a"
            loading
            margin={4}
            size={12}
          />
        </div> :
          <div className='flex items-center'>
            <Link to="/forgot-password" className="text-main hover:underline">
              Forgot Password?
            </Link>
            <button type="submit" className="text-white opacity-75 bg-main block ml-auto focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-md text-lg w-full sm:w-auto px-8 py-1 text-center dark:bg-main dark:hover:bg-blend-multiply dark:focus:ring-main animated-text ">
              <span className='transition-all delay-200'>Login</span>
            </button>
          </div>
        }
      </form>
    </div>
  )
}
