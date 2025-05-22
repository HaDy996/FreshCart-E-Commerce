import React from 'react';
import styles from './Footer.module.css';
import amazonLogo from '../../assets/images/amazonLogo.svg';
import americanExpressLogo from '../../assets/images/americanExpressLogo.svg';
import mastercardLogo from '../../assets/images/mastercardLogo.png';
import paypalLogo from '../../assets/images/paypalLogo.svg';

export default function Footer() {
  return (
    <footer className='bg-[#f2f2f2] dark:bg-gray-800 p-5 mt-8 py-8 md:py-20 w-full'>
      <div className="container w-full px-2">
        {/* App Download Section */}
        <div className='text-center md:text-left mb-8'>
          <h2 className='text-xl md:text-3xl text-[#212529] dark:text-white mb-2'>Get The FreshCart App</h2>
          <p className='text-[#6d767e] dark:text-gray-300 text-sm md:text-base font-light mb-4'>
            We will send you a link on your phone to download the app
          </p>
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 mb-6">
            <input
              type="tel"
              className='w-full md:grow rounded md:ms-6 text-sm md:text-base focus:border-main focus:ring-0 focus:ring-offset-0 focus:border-[2.5px] dark:bg-gray-700 dark:text-white dark:border-gray-600'
              placeholder='Enter phone number'
            />
            <button className='bg-main text-white md:px-12 md:py-1 py-3 rounded-md text-sm md:text-lg md:w-1/4 hover:bg-opacity-90'>
              Share App Link
            </button>
          </div>
        </div>

        {/* Payment & App Section */}
        <div className='flex flex-col lg:flex-row items-center justify-between py-8 border-y-2 dark:border-gray-700 gap-8 md:gap-4'>
          {/* Payment Partners */}
          <div className="payment flex flex-col md:flex-row items-center w-full lg:w-auto">
            <h3 className='text-lg md:text-xl mb-4 md:mb-0 md:me-3 dark:text-white'>
              Payment Partners 
            </h3>
            <div className="flex flex-wrap justify-center gap-4 items-center dark:bg-white dark:p-2 dark:rounded">
              <img src={amazonLogo} alt="Amazon Pay" className='h-5 md:h-6' />
              <img src={americanExpressLogo} alt="American Express" className='h-7 md:h-9' />
              <img src={mastercardLogo} alt="Mastercard" className='h-7 md:h-9' />
              <img src={paypalLogo} alt="PayPal" className='h-5 md:h-6' />
            </div>
          </div>

          {/* App Downloads */}
          <div className="flex flex-col items-center w-full lg:w-auto">
            <h3 className='mb-6 text-center md:text-left text-lg md:text-lg mt-6 dark:text-white'>
              Get Deliveries with FreshCart
            </h3>
            <div className="flex flex-col md:flex-row gap-5">
              <button className='bg-black text-white rounded flex items-center justify-center p-2 w-fit md:w-48 mx-auto hover:bg-gray-900'>
                <i className="fa-brands fa-apple text-white text-[35px] md:text-[50px] p-2 "></i>
                <div className='text-left'>
                  <span className='text-[8px] md:text-[12px] block'>Available on the</span>
                  <span className='font-bold text-sm md:text-lg me-2'>App Store</span>
                </div>
              </button>

              <button className='bg-black text-white rounded flex items-center justify-center p-2 w-fit md:w-48 mx-auto hover:bg-gray-900'>
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