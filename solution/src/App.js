// Import statements
import React, { useState, useEffect } from 'react';
import { isNameValid, getLocations } from './mock-api/apis';


// Component definition
const MyComponent = () => {
  // State for input values
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  
  // State for table data
  const [tableData, setTableData] = useState([]);
  
  // State for name validation
  const [isNameAvailable, setIsNameAvailable] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState('');

  // State for location options
  const [locationOptions, setLocationOptions] = useState([]);

  // Effect to fetch location options
  useEffect(() => {
    getLocations().then(options => {
      setLocationOptions(options);
    });
  }, []);

  // Function to handle name validation
  const handleNameChange = async (event) => {
    const newName = event.target.value;
    setName(newName);
    const isValid = await isNameValid(newName);
    setIsNameAvailable(isValid);
    if (!isValid) {
      setNameErrorMessage('This name has already been taken');
    } else if (tableData.some(item => item.name === newName)) {
      setNameErrorMessage('This name already exists in the table');
    } else {
      setNameErrorMessage('');
    }
  };

  // Function to handle location change
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // Function to add data to table
  const handleAdd = () => {
    if (name && location && isNameAvailable) {
      setTableData([...tableData, { name, location }]);
      setName('');
      setLocation('');
      setIsNameAvailable(true);
      setNameErrorMessage('');
    }
  };

  // Function to clear input fields
  const handleClear = () => {
    setName('');
    setLocation('');
    setIsNameAvailable(true);
    setNameErrorMessage('');
  };

  return (
    <div className="container">
      <div className="input-container">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter name"
        />
 
      </div>
      {nameErrorMessage && <div className="error-message">{nameErrorMessage}</div>}
      <div className="input-container">
        <label htmlFor="location">Location:</label>
        <select id="location" value={location} onChange={handleLocationChange}>
          <option value="">Select Location</option>
          {locationOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="button-container">
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

// Export the component
export default MyComponent;
