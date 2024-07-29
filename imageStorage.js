const scalingo = require('scalingo-sdk');

const client = new scalingo.Client({ token:tk-us-yhyRo6DKcM_VJY7gpqXZ6Ni0KHf73apagIADaciq_ntdtBJZ});

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
