import React, { useState, useEffect } from 'react';
import './Address.css';
import { Link } from 'react-router-dom';
import citiesData from '../Assets/indonesia-cities.json'; // Import your city data

const Address = () => {
  const [addressDetails, setAddressDetails] = useState({
    address_details: "",
    address_note: "",
    city: "",
    postal_code: "",
    phone_number: "", 
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const changeHandler = (e) => {
    setAddressDetails({ ...addressDetails, [e.target.name]: e.target.value });
  };

  const cancel = async () =>{
    const userId = localStorage.getItem('userId'); // Retrieve the userId from local storage
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }
    else{
      window.location.replace("/cart");
    }
  }

  const Add_address = async () => {
    setFormSubmitted(true); // Set formSubmitted to true when submit button is clicked

    const userId = localStorage.getItem('userId'); // Retrieve the userId from local storage
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    if (!validateForm()) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/addaddress', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...addressDetails, userId }), // Include userId in the request body
      });
      const data = await response.json();
      if (data.success) {
        alert("Address added successfully");
        window.location.replace("/cart");
      } else {
        alert("Failed to add address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      alert("An error occurred while adding the address");
    }
  };

  const validateForm = () => {
    return addressDetails.address_details !== "" && addressDetails.address_note !== "" && addressDetails.city !== "" && addressDetails.postal_code !== "" && addressDetails.phone_number !== "";
  };

  // Phone Number
  const [inputPhoneNumberValue, setPhoneNumberValue] = useState('');
  const regexPhoneNumberPattern = /^\d{10,13}$/;
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  const handlePhoneNumberChange = (e) => {
    const newValue = e.target.value;
    setPhoneNumberValue(newValue);

    if (regexPhoneNumberPattern.test(newValue)) {
      setIsPhoneNumberValid(true);
    } else {
      setIsPhoneNumberValid(false);
    }

    changeHandler(e);
  };

  // Postal Code
  const [inputValue, setInputValue] = useState('');
  const [isPostalCodeValid, setIsPostalCodeValid] = useState(true);
  const regexPattern = /^\d{5}$/;

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (regexPattern.test(newValue)) {
      setIsPostalCodeValid(true);
    } else {
      setIsPostalCodeValid(false);
    }

    changeHandler(e);
  };

  // City
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCities(citiesData.cities);
  }, []);

  const handleCityChange = (e) => {
    changeHandler(e);
  };

  return (
    <div>
      <div className="add-address">
        <div className="add-address-fields">
          <p>Address Details<span style={{color: 'red'}}> *</span></p>
          <textarea type='text' rows="3" cols="100" style={{ resize: 'none' }} maxLength="1000" name='address_details' placeholder='Input the address details (Street Name, RT/RW, Kelurahan, Kecamatan)' onChange={changeHandler} required></textarea>
          {formSubmitted && addressDetails.address_details === ""}
          <br/>
          <p>Address Note <span style={{color: 'red'}}> *</span></p>
          <textarea type='text' rows="3" cols="100" style={{ resize: 'none' }} maxLength="500" name='address_note' placeholder='Input the address note (Put the package to ...)' onChange={changeHandler} required></textarea>
          {formSubmitted && addressDetails.address_note === ""}
          <br/>
        </div>
        <div className="add-address-two-fields">
          <div className="add-address-sub-item">
            <p>City<span style={{color: 'red'}}> *</span></p>
            <select name='city' onChange={handleCityChange} required>
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            {formSubmitted && addressDetails.city === ""}
          </div>
          <div className="add-address-sub-item">
            <p>Postal Code <span style={{color: 'red'}}> *</span></p>
            <input type='text' name='postal_code' placeholder="Enter your postal code" value={inputValue} onChange={handleInputChange} required></input>
            {!isPostalCodeValid && inputValue !== '' && (
              <div style={{ color: 'red' }}>Please enter a valid 5-digit number.</div>
            )}
            {formSubmitted && addressDetails.postal_code === ""}
          </div>
        </div>
        <div className="phone-number-container">
          <label htmlFor="phone-number">Phone Number<span style={{color: 'red'}}> *</span></label>
          <input
            id="phone-number"
            type="text"
            name='phone_number'
            value={inputPhoneNumberValue}
            onChange={handlePhoneNumberChange}
            placeholder="Enter your phone number"
            required
          />
          {!isPhoneNumberValid && inputPhoneNumberValue !== '' && (
            <div style={{ color: 'red' }}>Please enter a valid 10-13 digit number.</div>
          )}
          {formSubmitted && addressDetails.phone_number === ""}
        </div>
        <div className='button-sampingan'>
          {/* <Link to={'/cart'} style={{ textDecoration: "none" }}> */}
            <button className='cancel' onClick={()=>{cancel()}}>Cancel</button>
          {/* </Link> */}
          <button className='submit' onClick={() => { Add_address() }}>Submit</button>
        </div>
        {formSubmitted && !validateForm() && (
          <p style={{ color: 'red', marginBottom:'30%' }}>Please fill out all required fields.</p>
        
        )}
      </div>
    </div>
  );
}

export default Address;