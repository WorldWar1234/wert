const express = require('express');
const fs = require('fs');
const path = require('path');
const compress = require('./compress');  // Assuming compress.js exists

const app = express();

app.get('/images/:imageId', async (req, res) => {
  const imagePath = path.join(__dirname, 'images', req.params.imageId + '.jpg'); // Adjust path as needed

  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const compressedImage = await compress(req, res, imageBuffer);
    if (compressedImage) {
      // Send the compressed image
      res.setHeader('Content-Type', compressedImage.contentType);
      res.setHeader('Content-Length', compressedImage.length);
      res.send(compressedImage.data);
    } else {
      // Handle potential errors during compression
      res.sendStatus(500);
    }
  } catch (err) {
    console.error('Error reading image:', err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
