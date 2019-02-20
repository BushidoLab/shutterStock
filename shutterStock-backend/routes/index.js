var express = require('express');
var router = express.Router();
var axios = require('axios');

const CLOUDINARY_URL="https://684518815981178:28_JNXsgqpczG-2Rl4cCd4oZ1PM@api.cloudinary.com/v1_1/diegolealb/resources/image";
let gallery;

// Get the gallery before page loads
getGallery();

/* GET home page. */
router.get('/', function(req, res, next) {
  getGallery();
  res.json(gallery);
});

module.exports = router;

function getGallery() {
  axios.get(CLOUDINARY_URL)
    .then(res => {
      gallery = res.data.resources;
      console.log("Refreshed image gallery from cloudinary");
    })
    .catch(err => {
      console.error(err);
    });
}

