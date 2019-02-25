var image = require('../models/schema');

async function getGallery() {
  try {
    let response = image.find();
    return response;
  }  catch (err) {
    console.error("getGallery ERROR", err.response);
  }
}

module.exports = getGallery;
