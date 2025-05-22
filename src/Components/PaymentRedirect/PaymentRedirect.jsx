import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// It will immediately redirect to the payment-success page
export default function PaymentRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Use window.location.replace for a cleaner URL change that doesn't add to browser history
    window.location.replace('/#/payment-success');

    // As a fallback, also use React Router's navigate
    // This will only run if the replace method above doesn't immediately redirect
    const fallbackTimer = setTimeout(() => {
      navigate('/payment-success', { replace: true });
    }, 100);

    return () => clearTimeout(fallbackTimer);
  }, [navigate]);

  // Return a minimal loading indicator while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">Redirecting...</p>
    </div>
  );
}
