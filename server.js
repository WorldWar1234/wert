const express = require('express');
const fs = require('fs');
const path = require('path');
const compress = require('./compress');
const params = require('./params');

const app = express();

// Ensure params middleware runs before image handling
app.use(params);

app.get('/images/:imageId', async (req, res) => {
  const imagePath = path.join(__dirname, 'images', req.params.imageId + '.jpg'); // Adjust path as needed

  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const compressedImage = await compress(req, res, imageBuffer);
    res.setHeader('Content-Type', compressedImage.contentType);
    res.send(compressedImage.data);
  } catch (err) {
    console.error('Error processing image:', err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
