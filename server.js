const express = require('express');
const fs = require('fs');
const path = require('path');
const compress = require('./compress');

const app = express();

app.get('/images/:imageId', async (req, res) => {
  const imagePath = path.join(__dirname, 'images', req.params.imageId + '.jpg'); // Adjust path as needed

  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const compressedImage = await compress(req, res, imageBuffer);
    res.setHeader('Content-Type', compressedImage.contentType || 'image/jpeg'); // Set content type based on compression result
    res.send(compressedImage);
  } catch (err) {
    console.error('Error reading image:', err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
