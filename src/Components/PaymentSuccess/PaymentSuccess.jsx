import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SyncLoader } from 'react-spinners';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Show success message
    toast.success('Payment successful! Your order has been placed.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored"
    });

    // Log the current location for debugging
    console.log('Current location:', location.pathname);

    // Redirect to home page after 3 seconds
    const redirectTimer = setTimeout(() => {
      // Navigate to home page regardless of current path
      navigate('/');
    }, 3000);

    // Clean up timer if component unmounts
    return () => clearTimeout(redirectTimer);
  }, [navigate, location]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="bg-green-50 p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <div className="text-green-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-main mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been placed successfully.</p>
        <div className="flex justify-center mb-4">
          <SyncLoader color="#0aad0a" loading margin={4} size={10} />
        </div>
        <p className="text-gray-500">Redirecting to home page...</p>
      </div>
    </div>
  );
}
