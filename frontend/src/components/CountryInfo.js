import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../styles.css';


const CountryInfo = () => {
    const { code } = useParams();
    const [countryInfo, setCountryInfo] = useState(null);

    useEffect(() => {
        const fetchCountryInfo = async () => {
            const response = await axios.get(`http://localhost:5000/api/country/${code}`);
            setCountryInfo(response.data);
        };
        fetchCountryInfo();
    }, [code]);

    if (!countryInfo) return <div>Loading...</div>;

    return (
        <div>
            <h1>{countryInfo.commonName}</h1>
            <img src={countryInfo.flagUrl} alt={`${countryInfo.commonName} flag`} />
            <h2>Borders</h2>
            <ul>
                {countryInfo.borders.map(border => (
                    <li key={border.countryCode}>
                        <Link to={`/country/${border.countryCode}`}>{border.commonName}</Link>
                    </li>
                ))}
            </ul>
            <h2>Population Over Time</h2>
            <LineChart width={600} height={300} data={countryInfo.population}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
        </div>
    );
};

export default CountryInfo;
