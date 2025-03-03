import React, { useEffect, useState } from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'Yup'
import axios from 'axios'
import { PulseLoader } from 'react-spinners'
import { SyncLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import 'animate.css'


export default function Register() {

  let [isCallingAPI, setIsCallingAPI] = useState(false)
  let [apiError, setApiError] = useState(null)
  let navigate = useNavigate()

  const initialValues = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: ''
  }
  //! We use Formik Package To handle :
  // - Getting values in and out of form state
  // - Validation and error messages
  // - Handling form submite and prevent refresh from submite  


  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "min length is 3 letters").max(15, "Max length is 15 letters").required("Required"),
    email: Yup.string().email('Invalid Email Address').required("Required"),
    password: Yup.string().matches(new RegExp('^[A-Z][a-z0-9]{3,8}$'), 'Invalid Password').required("Required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "rePassword Should Match Password").required("Required"),
    phone: Yup.string().matches(new RegExp('^01[0125][0-9]{8}$'), "Invalid Egyptian Phone Number").required("Required")
  })


  const registerForm = useFormik({
    initialValues,
    validationSchema,
    //!Validate inputes / userData
    // validate:(values)=> {
    //   const errors ={};
    //   //Name:
    //   if(!values.name) {
    //     errors.name = "Requried"
    //   }else if(values.name.length < 3) {
    //     errors.name = "Min length is 3 Letters"
    //   }else if(values.name.length > 15) {
    //     errors.name = "Max length is 15 letters"
    //   }

    //   //Email:
    //   if(!values.email) {
    //     errors.email = "Required"
    //   }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     errors.email = "Invalid Email Address"
    //   }

    //   //Password:
    //   if(!values.password) {
    //     errors.password = "Required"

    //   }else if(!/^[A-Z][a-z0-9]{3,8}$/.test(values.password)) {
    //     errors.password = "Invalid Password (Should Start with Capital letter)"
    //   }
    //   // rePassword:
    //   if(!values.rePassword) {
    //     errors.rePassword = "Required"

    //   }else if(values.rePassword != values.password) {
    //     errors.rePassword = "rePassword must match Password"
    //   }
    //   //Phome:
    //   if(!values.phone) {
    //     errors.phone = "Required"

    //   }else if(!/^01[0125][0-9]{8}$/.test(values.phone)) {
    //     errors.phone = "Invalid Egyptian Phone Number"
    //   }


    //   // console.log(errors);

    //   return errors
    // },
    //! Or we Can use Yup Pachage like in line '21'
    onSubmit: callRegister,


  })


  async function callRegister(values) {
  try {
    setIsCallingAPI(true)
    setApiError(null)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
    console.log(data);
    setIsCallingAPI(false)
    navigate("/login")
  } catch (error) {
    setApiError(error.response.data.message)
    setIsCallingAPI(false)

  }
  }




  return (
    <div>

      <form onSubmit={registerForm.handleSubmit} class="w-3/6 mx-auto my-10">
        <h1 className='text-5xl mb-7 font-extrabold text-main font-mono border-x-[4px] border-main rounded-lg px-3 inline-block'>Register Now</h1>
        {apiError  ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {apiError}
          </div> : ''}

        <div class="relative z-0 w-full mb-5 group">
          <input type="text" name="name" value={registerForm.values.name} onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} id="name" class="block mb-1 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
          <label for="name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name :</label>
          {registerForm.errors.name && registerForm.touched.name ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {registerForm.errors.name}
          </div> : null}

        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input type="email" name="email" value={registerForm.values.email} onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} id="Email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
          <label for="Email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email :</label>
          {registerForm.errors.email && registerForm.touched.email ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {registerForm.errors.email}
          </div> : null}
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input type="password" name="password" value={registerForm.values.password} onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} id="Password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
          <label for="Password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password :</label>
          {registerForm.errors.password && registerForm.touched.password ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {registerForm.errors.password}
          </div> : null}
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input type="password" name="rePassword" value={registerForm.values.rePassword} onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} id="rePass" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
          <label for="rePass" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword :</label>
          {registerForm.errors.rePassword && registerForm.touched.rePassword ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {registerForm.errors.rePassword}
          </div> : null}
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input type="tel" name="phone" value={registerForm.values.phone} onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} id="phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
          <label for="phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone :</label>
          {registerForm.errors.phone && registerForm.touched.phone ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {registerForm.errors.phone}
          </div> : null}
        </div>

      
        {isCallingAPI == true ? <div className='flex justify-end p-3 mb-2'>
          <SyncLoader
            color="#0aad0a"
            loading
            margin={4}
            size={12}
          />
        </div> : <button type="submit" className="text-white opacity-75 bg-main block ml-auto focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-md text-lg w-full sm:w-auto px-4 py-2 text-center dark:bg-main dark:hover:bg-blend-multiply dark:focus:ring-main animated-text">
          <span className='transition-all delay-200'>Register</span>
        </button>
        }


      </form>

    </div>
  )
}
