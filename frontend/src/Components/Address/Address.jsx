import React, { useState, useEffect } from 'react'
import './Address.css'
import { Link } from 'react-router-dom'
import citiesData from '../Assets/indonesia-cities.json'; // Import your city data


const Address = () => {

  const [addressDetails, setaddressDetails] = useState({
    address_details: "",
    address_note: "",
    city: "Jakarta",
    postal_code: "",
    phone_number: ""
  })

  const changeHandler = (e) => {
    setaddressDetails({ ...addressDetails, [e.target.name]: e.target.value })
  }

  const Add_address = async () => {
    let responseData;
    let address = addressDetails;

    let formData = new FormData();
    formData.append('address');

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    }).then((resp) => resp.json()).then((data) => { responseData = data })

    if (responseData.success) {
      address.image = responseData.image_url;
      console.log(address);
      await fetch('http://localhost:4000/addaddress', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(address),
      }).then((resp) => resp.json()).then((data) => {
        data.success ? alert("address Added") : alert("Failed")
      })
    }
  }

  const [inputPhoneNumberValue, setPhoneNumberValue] = useState('');
  const regexPhoneNumberPattern = /^\d{10,13}$/;

  const handlePhoneNumberChange = (e) => {
    const newValue = e.target.value;
    setPhoneNumberValue(newValue);

    if (regexPhoneNumberPattern.test(newValue)) {
      setIsValid(true);
      // Valid input (10-13 digit numerical value)
    } else {
      setIsValid(false);
      // Invalid input
    }
  };

  //Postal Code 
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const regexPattern = /^\d{5}$/;

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (regexPattern.test(newValue)) {
      setIsValid(true);
      // Valid input (5-digit numerical value)
    } else {
      setIsValid(false);
      // Invalid input
    }
  };

  //City
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCities(citiesData.cities);
  }, []);

  const handleCityChange = (e) => {
    const selectedCityId = parseInt(e.target.value, 10);
    console.log('Selected city ID:', selectedCityId);
  };
  return (
    <div>
      <div className="add-address">
        <div className="add-address-fields">
          <p>Address details</p>
          <textarea type='text' rows="5" cols="100" style={{ resize: 'none' }} maxlength="1000" name='address-details' placeholder='Input the address details (Street Name, RT/RW, Kelurahan, Kecamatan)'></textarea>
          <p>Address Note</p>
          <textarea type='text' rows="5" cols="100" style={{ resize: 'none' }} maxlength="500" name='address-note' placeholder='Input the address note (Put the package to ...)'></textarea>
        </div>
        <div className="add-address-two-fields">
          <div className="add-address-sub-item">
            <p>City</p>
            <select onChange={handleCityChange}>
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="add-address-sub-item">
            <p>Postal Code</p>
            <input type='text' placeholder="Enter your postal code" value={inputValue}
              onChange={handleInputChange}
            ></input>
            {!isValid && inputValue !== '' && (
              <div style={{ color: 'red' }}>Please enter a valid 5-digit number.</div>
            )}
          </div>
        </div>
        <div className="phone-number-container">
        <label htmlFor="phone-number">Phone Number</label>
        <input
          id="phone-number"
          type="text"
          value={inputPhoneNumberValue}
          onChange={handlePhoneNumberChange}
          placeholder="Enter your phone number"
        />
        {!isValid && inputPhoneNumberValue !== '' && (
              <div style={{ color: 'red' }}>Please enter a valid 10-13 digit number.</div>
            )}
      </div>
        <div class='button-sampingan'>
          <Link to={'/'} style={{ textDecoration: "none" }}>
            <button className='cancel'>Cancel</button>
          </Link>
          <Link to={'/wig'} style={{ textDecoration: "none" }}>
            <button className='submit'>Submit</button>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Address
