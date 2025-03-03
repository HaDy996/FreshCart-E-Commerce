// import React, { useEffect, useState } from 'react'
// import styles from './Footer.module.css'
// import amazonLogo from '../../assets/images/amazonLogo.svg'
// import americanExpressLogo from '../../assets/images/americanExpressLogo.svg'
// import mastercardLogo from '../../assets/images/mastercardLogo.png'
// import paypalLogo from '../../assets/images/paypalLogo.svg'

// export default function Footer() {
//   return (
//     <footer className='bg-[#f2f2f2] p-5 mt-8 py-20 w-full'>
//       <div className="container w-full">
//         <h2 className='text-3xl text-[#212529] mb-2'>Get The FreshCart App</h2>
//         <p className='text-[#6d767e] font-light'>We will send you a link on your phone to download the app</p>
//         <div className="flex gap-5 mb-6">
//           <input type="tel" className='grow rounded mt-3 ms-6' placeholder='' />
//           <button className='bg-main text-nowrap text-white px-12 rounded-md my-2'>Share App Link</button>
//         </div>
//         <div className='flex items-center justify-between py-8 border-y-2'>
//           <div className="payment items-center flex">
//             <h3 className='text-xl ms-6 font-light me-3'>Payment Partners</h3>
//             <div className="flex gap-4 mt-2 items-center">
//               <img src={amazonLogo} alt="Amazon Pay" className='h-5' />
//               <img src={americanExpressLogo} alt="American Express" className='h-9' />
//               <img src={mastercardLogo} alt="Mastercard" className='h-9' />
//               <img src={paypalLogo} alt="PayPal" className='h-5' />
//             </div>
//           </div>
//           <div className="app flex items-end">
//             <h3 className='mb-3 me-4'>Get Deliveries with FreshCart</h3>
//             <div className="flex gap-3">
//               <button className='bg-black text-white rounded  transition-colors flex items-center'>
//                 <i class="fa-brands fa-apple text-white text-3xl p-3 w-1/5"></i>
//                 <div className='me-2 w-4/5 ms-1'>
//                   <span className='text-[8px] block'>Available on the</span>
//                   <span className='font-bold'>App Store</span>
//                 </div>
//               </button>
//               <button className='bg-black text-white rounded  transition-colors flex items-center'>
//                 <img className='ms-1' width="35" height="35" src="https://img.icons8.com/color/48/google-play.png" alt="google-play" />
//                 <div className='me-2 w-4/5 ms-1'>
//                   <span className='text-[8px] block text-start'>GET IT ON</span>
//                   <span className='font-bold'>Google Play</span>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }






import React from 'react';
import styles from './Footer.module.css';
import amazonLogo from '../../assets/images/amazonLogo.svg';
import americanExpressLogo from '../../assets/images/americanExpressLogo.svg';
import mastercardLogo from '../../assets/images/mastercardLogo.png';
import paypalLogo from '../../assets/images/paypalLogo.svg';

export default function Footer() {
  return (
    <footer className='bg-[#f2f2f2] p-5 mt-8 py-8 md:py-20 w-full'>
      <div className="container w-full px-2">
        {/* App Download Section */}
        <div className='text-center md:text-left mb-8'>
          <h2 className='text-xl md:text-3xl text-[#212529] mb-2'>Get The FreshCart App</h2>
          <p className='text-[#6d767e] text-sm md:text-base font-light mb-4'>
            We will send you a link on your phone to download the app
          </p>
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 mb-6">
            <input
              type="tel"
              className='w-full md:grow rounded md:ms-6 text-sm md:text-base focus:border-main focus:ring-0 focus:ring-offset-0 focus:border-[2.5px]'
              placeholder='Enter phone number'
            />
            <button className='bg-main text-white md:px-12 md:py-1 py-3 rounded-md text-sm md:text-lg md:w-1/4 '>
              Share App Link
            </button>
          </div>
        </div>

        {/* Payment & App Section */}
        <div className='flex flex-col lg:flex-row items-center justify-between py-8 border-y-2 gap-8 md:gap-4'>
          {/* Payment Partners */}
          <div className="payment flex flex-col md:flex-row items-center w-full lg:w-auto">
            <h3 className='text-lg md:text-xl mb-4 md:mb-0 md:me-3'>
              Payment Partners 
            </h3>
            <div className="flex flex-wrap justify-center gap-4 items-center">
              <img src={amazonLogo} alt="Amazon Pay" className='h-5 md:h-6' />
              <img src={americanExpressLogo} alt="American Express" className='h-7 md:h-9' />
              <img src={mastercardLogo} alt="Mastercard" className='h-7 md:h-9' />
              <img src={paypalLogo} alt="PayPal" className='h-5 md:h-6' />
            </div>
          </div>

          {/* App Downloads */}
          <div className="flex flex-col items-center w-full lg:w-auto">
            <h3 className='mb-6 text-center md:text-left text-lg md:text-lg mt-6'>
              Get Deliveries with FreshCart
            </h3>
            <div className="flex flex-col md:flex-row gap-5">
              <button className='bg-black text-white rounded flex items-center justify-center p-2 w-fit md:w-48 mx-auto'>
                <i className="fa-brands fa-apple text-white text-[35px] md:text-[50px] p-2 "></i>
                <div className='text-left'>
                  <span className='text-[8px] md:text-[12px] block'>Available on the</span>
                  <span className='font-bold text-sm md:text-lg me-2'>App Store</span>
                </div>
              </button>

              <button className='bg-black text-white rounded flex items-center justify-center p-2 w-fit md:w-48 mx-auto'>
                <img
                  className='ms-1'
                  width="45"
                  height="45"
                  src="https://img.icons8.com/color/48/google-play.png"
                  alt="google-play"
                />
                <div className='text-left'>
                  <span className='text-[8px] md:text-[12px] block'>GET IT ON</span>
                  <span className='font-bold text-sm md:text-lg me-2'>Google Play</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}