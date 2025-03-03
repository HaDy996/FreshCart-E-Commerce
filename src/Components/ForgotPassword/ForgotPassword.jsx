import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners'
import 'animate.css'
import { toast } from 'react-toastify';
import * as Yup from 'Yup'



const ForgotPassword = () => {
  //! Yup Validation Schemas
  //^Email
  const emailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email Address').required("Required"),
  });
  //^confirmCode
  const codeSchema = Yup.object().shape({
    resetCode: Yup.string().required('Verification code is required').matches(/^\d{6}$/, 'Must be 6-digit code'),
  });
  //^password
  const passwordSchema = Yup.object().shape({
    newPassword: Yup.string().matches(new RegExp('^[A-Z][a-z0-9]{3,8}$'), 'Invalid Password').required("Required"),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords must match').required('Confirm Password is required'),
  });

  //! ForgotPassword Steps:
  //^Step 1: Email submission for reset code
  //^Step 2: Verification code check
  //^Step 3: Password reset
  const [email, setEmail] = useState(''); //Email State
  const [resetCode, setResetCode] = useState(''); // resetCode state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // State to trigger steps
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate();




  //^ Step 1: ForgetPassword and fetch forgotPass ==> Email submit to reset code
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailSchema.validate({ email });
      await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email });
      setStep(2);
      setError('');
      toast.success('Reset code sent to your email!', {
        position: "top-center",
        theme: "colored",
        autoClose: 1500
      });
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset code');
      setLoading(false);
    }
  };

  //^ Step 2: Verification code check ==> Request the reset code from BE
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await codeSchema.validate({ resetCode });
      await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode });
      setStep(3);
      setError('');
      toast.success('Code verified successfully!', {
        position: "top-center",
        theme: "colored",
        autoClose: 1500
      });
      setLoading(false);
    } catch (err) {
      setError(err.errors?.[0] || err.response?.data?.message || 'Invalid verification code');
      setLoading(false);
    }
  };

  //^ Final step : create newPassword and Update it
  const handleResetPassword = async (e) => {
    //check the new pass and confirm is Matched
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await passwordSchema.validate({ newPassword, confirmPassword });
      await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        email,
        newPassword,
      });
      toast.success("Your Password Updated successfully ", { position: "top-center", theme: "colored", type: "success", autoClose: 800 })
      navigate('/login');
    } catch (err) {
      setError(err.errors?.[0] || err.response?.data?.message || 'Password reset failed');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-8 text-center text-main border-x-[4px] border-main rounded-lg ">Password Reset</h1>
{/* Step 1: form ==> Email submit to reset code */}
      {step === 1 && (
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label className="block mb-2 text-main font-bold">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:border-main focus:ring-0 focus:ring-offset-0 focus:border-[2.5px]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-main text-white text-lg p-2 rounded hover:bg-main-dark"
          >
            {loading ?
              <SyncLoader
                color="white"
                loading
                margin={4}
                size={12}
              /> : 'Send Reset Code'}
          </button>
        </form>
      )}
{/* step 2 form ==> Request the reset code from BE */}
      {step === 2 && (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div>
            <label className="block mb-2 text-main font-bold">Verification Code</label>
            <input
              type="text"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              className="w-full p-2 border rounded focus:border-main focus:ring-0 focus:ring-offset-0 focus:border-[2.5px]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-main text-white text-lg p-2 rounded hover:bg-main-dark"
          >
            {loading ?
              <SyncLoader
                color="white"
                loading
                margin={4}
                size={12}
              /> : 'Verify Code'}
          </button>
        </form>
      )}
      {/* Final Step form : Create new Pass and Update */}
      {step === 3 && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block mb-2 text-main font-bold">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded focus:border-main focus:ring-0 focus:ring-offset-0 focus:border-[2.5px]"
              required
              minLength="3"
            />
          </div>
          <div>
            <label className="block mb-2 text-main font-bold focus:border-main focus:ring-0 focus:ring-offset-0">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded focus:border-main focus:ring-0 focus:ring-offset-0 focus:border-[2.5px]"
              required
              minLength="3"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-main text-white text-lg p-2 rounded hover:bg-main-dark"
          >
            {loading ?
              <SyncLoader
                color="white"
                loading
                margin={4}
                size={12}
              /> : 'Reset Password'}
          </button>
        </form>
      )}

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      {step !== 1 && (
        <button
          onClick={() => setStep(1)}
          className="mt-4 text-main hover:underline"
        >
          Back to Email Entry
        </button>
      )}
    </div>
  );
};

export default ForgotPassword;