import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch countries data');
        }
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <div className='headline'>
      <div className='input'>
        <input
          className='in'
          type='text'
          placeholder='Search for countries...'
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="country-list">
        {error && <p>Error: {error}</p>}
        {filteredCountries.map(country => (
          <div key={country.cca3} className="countryCard">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
            />
            <h2 className='h2'>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
