const https = require('https');

async function getImage(imageId) {
  const options = {
    hostname: 'api.scalingo.com',
    path: `/v1/apps/<your-app-name>/files/${imageId}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.SCALINGO_TOKEN}`
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Error fetching image: ${res.statusCode}`));
      }

      const data = [];
      res.on('data', (chunk) => {
        data.push(chunk);
      });

      res.on('end', () => {
        resolve(Buffer.concat(data));
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

module.exports = { getImage };
