require('dotenv').config();
var express = require('express');
var router = express.Router();
var axios = require('axios');

const CLOUDINARY_URL=process.env.CLOUDINARY_URL;
let gallery;

// Get the gallery before page loads
gallery = getGallery();
console.log(gallery);

/* GET gallery page. */
router.get('/api/gallery', function(req, res, next) {
  res.json(gallery);
});

function getGallery() {
  axios.get(CLOUDINARY_URL)
    .then(res => {
      gallery = res.data.resources;
      return gallery;
    })
    .catch(err => {
      console.error(err);
    });
}

module.exports = router;
