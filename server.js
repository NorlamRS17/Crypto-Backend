const express = require('express');
const axios = require('axios');
const cors = require('cors');  

const app = express();
const PORT = process.env.PORT || 5000; //SI NO HAY UN PUERTO DEFINIDO SE USARA EL PURTO 5000

const API_KEY = '3c600a51-9285-4a26-938d-daa34d9ee3b7';
const API_HEADER = 'X-CMC_PRO_API_KEY';

app.use(cors());  

app.get('/cryptos', async (req, res) => {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        [API_HEADER]: API_KEY,
      },
      params: {
        limit: 100,
        convert: 'USD',
      },
    });

    res.json(response.data.data);  
  } catch (error) {
    console.error('Error fetching data from CoinMarketCap', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});