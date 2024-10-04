const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/countries', async (req, res) => {
    try {
        const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching countries' });
    }
});

app.get('/api/country/:code', async (req, res) => {
    const countryCode = req.params.code;
    try {
        console.log(`Fetching data for country code: ${countryCode}`);

        const countryInfo = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
        console.log('Country Info:', countryInfo.data);

        const populationData = await axios.post('https://countriesnow.space/api/v0.1/countries/population', { country: countryInfo.data.commonName });
        console.log('Population Data:', populationData.data);

        const flagData = await axios.post('https://countriesnow.space/api/v0.1/countries/flag/images', { country: countryInfo.data.commonName });
        console.log('Flag Data:', flagData.data);

        res.json({
            borders: countryInfo.data.borders,
            population: populationData.data.data.populationCounts,
            flagUrl: flagData.data.data.flag
        });
    } catch (error) {
        if (error.response) {
            console.error(`Error fetching data: ${error.response.status} - ${error.response.statusText}`);
        } else {
            console.error('Error fetching country information:', error.message);
        }
        res.status(500).json({ message: 'Error fetching country information' });
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});