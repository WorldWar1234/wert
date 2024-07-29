const scalingo = require('scalingo-sdk');

const client = new scalingo.Client({ token: process.env.SCALINGO_TOKEN });

async function getImage(imageId) {
  try {
    const file = await client.file.download(imageId);
    return file.content;
  } catch (err) {
    console.error('Error fetching image:', err);
    throw err;
  }
}

module.exports = { getImage };
