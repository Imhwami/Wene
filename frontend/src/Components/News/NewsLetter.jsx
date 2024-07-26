import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './NewsLetter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(newEmail === '' || emailRegex.test(newEmail));
  };

  const handleSubscribe = async () => {
    if (!email || !isEmailValid) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Subscription successful! Please check your email.', {
          className: 'custom-toast',
          style: { alignItems: 'center', width: '450px' },
          icon: <FontAwesomeIcon icon={faHeart} className="custom-toast-icon fa-beat" />
        });
        setEmail('');
        setIsEmailValid(true);
      } else {
        toast.error('Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div className='inputemail'>
        <input
          type="email"
          placeholder='Your Email id'
          value={email}
          onChange={handleEmailChange}
        />
        <button className='buttonsubscribe' onClick={handleSubscribe} disabled={loading || !isEmailValid || email === ''}>
          {loading ? (
            <FontAwesomeIcon className='spinner-icon' icon={faSpinner} spin />
          ) : (
            'Subscribe'
          )}
        </button>
      </div>
      {email && !isEmailValid && <p className="error-message">Please enter a valid email address.</p>}
      <ToastContainer
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="custom-toast-body"
      />
    </div>
  );
}

export default NewsLetter;
