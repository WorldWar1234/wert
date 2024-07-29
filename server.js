const express = require('express');
const compress = require('./src/compress');
const params = require('./src/params');
const imageStorage = require('./imageStorage'); // Assuming an image storage module

const app = express();

app.use(params);

app.get('/images/:imageId', async (req, res) => {
  try {
    const imageBuffer = await imageStorage.getImage(req.params.imageId); // Fetch image from storage
    const compressedImage = await compress(req, res, imageBuffer);
    res.setHeader('Content-Type', compressedImage.contentType);
    res.send(compressedImage.data);
  } catch (err) {
    console.error('Error processing image:', err);
    res.sendStatus(500);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
