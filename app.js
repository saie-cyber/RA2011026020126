const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Use your desired port number

app.get('/numbers', async (req, res) => {
  const urls = req.query.url || [];
  const validNumbers = new Set();

  try {
    const requests = urls.map(async (url) => {
      try {
        const response = await axios.get(url);
        const { numbers } = response.data;
        numbers.forEach((number) => validNumbers.add(number));
      } catch (error) {
        // Ignore failed requests
      }
    });

    await Promise.all(requests);

    const sortedNumbers = Array.from(validNumbers).sort((a, b) => a - b);

    res.json({ numbers: sortedNumbers });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
