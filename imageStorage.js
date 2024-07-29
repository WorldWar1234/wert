const scalingo = require('scalingo-sdk');

const client = new scalingo.Client({ token: tk-us-SXe6hmk4BIH7k2eyuA_n4qQmearur9UUtq6ar6MRvQ87HMz3 });

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
