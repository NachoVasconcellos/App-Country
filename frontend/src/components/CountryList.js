import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/countries');
                setCountries(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching countries');
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Available Countries</h1>
            <ul>
                {countries.map(country => (
                    <li key={country.countryCode}>
                        <Link to={`/country/${country.countryCode}`}>{country.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountryList;
