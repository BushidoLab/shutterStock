require('dotenv').config();
var axios = require('axios');

const CLOUDINARY_URL=process.env.CLOUDINARY_URL;

async function getGallery() {
  try {
    let response = await axios.get(CLOUDINARY_URL);
    response = response.data.resources;
    return response;
  }  catch (err) {
    console.error("getGallery ERROR", err.response);
  }
}

module.exports = getGallery;