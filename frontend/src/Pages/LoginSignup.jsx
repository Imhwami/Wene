import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const LoginSignup = () => {

  const [isFocused, setIsFocused] = useState(false);
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [agree, setAgree] = useState(false); // State for checkbox
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkboxChangeHandler = (e) => {
    setAgree(e.target.checked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const validateLoginForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return (
      formData.password !== "" &&
      formData.email !== "" &&
      emailRegex.test(formData.email) &&
      passwordRegex.test(formData.password)
    );
  };

  const validateSignUpForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return (
      formData.username !== "" &&
      formData.password !== "" &&
      formData.email !== "" &&
      emailRegex.test(formData.email) &&
      passwordRegex.test(formData.password)
    );
  };

  const login = async () => {
    setFormSubmitted(true);
    if (!validateLoginForm()) {
      toast.error("Please fill out all required fields with valid data.");
      return;
    }

    console.log("Login Function Executed", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      localStorage.setItem('userId', responseData.userId);
      localStorage.setItem('email', responseData.email);
      toast.success("User successfully logged in", {
        className: 'custom-toast',
        icon: <FontAwesomeIcon icon={faHeart} className="custom-toast-icon fa-beat" />
      });

      setTimeout(() => {
        window.location.replace("/");
      }, 200); // Redirect after 2 seconds to allow toast to display
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    setFormSubmitted(true);
    if (!agree) {
      alert("You must agree to the terms and privacy policy.");
      return;
    }

    if (!validateSignUpForm()) {
      alert("Please fill out all required fields with valid data.");
      return;
    }

    console.log("SignUp Function Executed", formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json()).then((data) => responseData = data);
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('userId', responseData.userId);
        localStorage.setItem('email', responseData.email);
      }
      toast.success("User successfully sign up", {
        className: 'custom-toast',
        icon: <FontAwesomeIcon icon={faHeart} className="custom-toast-icon fa-beat" />
      });
      console.log(responseData)
      setTimeout(() => {     
        window.location.replace("/cart");
      }, 200);   
      setFormData({ username: "", password: "", email: "" }); // Reset form data
      setFormSubmitted(false); // Reset form submission state
      setAgree(false); // Reset agree state
    } else {
      alert(responseData.errors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    state === "Login" ? login() : signup();
  };

  document.addEventListener('focusin', (e) => {
    if (window.innerWidth <= 320) {
        const target = e.target;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    }
});

  return (
    <div className='loginsignup'>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            {state === "Sign Up" && (
              <>
                <input
                  name='username'
                  value={formData.username}
                  onChange={changeHandler}
                  type="text"
                  placeholder='Input your name'
                  required
                />
                {formSubmitted && formData.username === "" && <p style={{ color: 'red' }}>The field is required</p>}
              </>
            )}
            <input
              name='email'
              value={formData.email}
              onChange={changeHandler}
              type="email"
              placeholder='Input your email address'
              required
            />
            {formSubmitted && formData.email === "" && <p style={{ color: 'red' }}>The field is required</p>}
            {formSubmitted && formData.email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && <p style={{ color: 'red' }}>Invalid email format</p>}
            <div className="password-field">
              <input
                name='password'
                value={formData.password}
                onChange={changeHandler}
                onFocus={onFocus}
                onBlur={onBlur}
                type={showPassword || isFocused ? "text" : "password"}
                placeholder='Input your password'
                required
              />
              <span onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <i className="fa fa-eye-slash eye-icon" style={{ width: '30px', color: 'red' }}></i>
                ) : (
                  <i className="fa fa-eye eye-icon" style={{ width: '30px', color: 'grey' }}></i>
                )}
              </span>
            </div>

            {formSubmitted && formData.password === "" && <p style={{ color: 'red' }}>The field is required</p>}
            {formSubmitted && formData.password !== "" && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(formData.password) && <p style={{ color: 'red' }}>Password must contain at least 8 characters, including one lowercase letter, one uppercase letter, one numeric digit, and one special character</p>}
          </div>
          {state === "Sign Up" && (
            <div className="login-signup-agree">
              <input
                type="checkbox"
                name='agree'
                checked={agree}
                onChange={checkboxChangeHandler}
                required
              />
              <p>By continuing, I agree to the terms of use and privacy policy</p>
            </div>
          )}
          <button type="submit">Continue</button>
        </form>
        {state === "Sign Up" ? (
          <p className='loginsignup-login'>
            Already have an account? <span onClick={() => { setState("Login") }}>Login Here</span>
          </p>
        ) : (
          <p className='loginsignup-login'>
            Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span>
          </p>
        )}

      </div>
      <ToastContainer
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default LoginSignup;
