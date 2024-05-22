import React, { useState, useEffect } from 'react'
import './Address.css'
import { Link } from 'react-router-dom'
import citiesData from '../Assets/indonesia-cities.json'; // Import your city data


const Address = () => {
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
            <input type='text' placeholder="Enter a 5-digit number" value={inputValue}
              onChange={handleInputChange}
            ></input>
            {!isValid && inputValue !== '' && (
              <div style={{ color: 'red' }}>Please enter a valid 5-digit number.</div>
            )}
          </div>
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
