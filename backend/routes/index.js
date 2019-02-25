require('dotenv').config();
var express = require('express');
var router = express.Router();

var Image = require('../public/models/schema');

// Functions
// var upload = require('../public/javascripts/axiosUpload');
var upload = require('../public/javascripts/cloudinaryUpload');
// var getGallery = require('../public/javascripts/getGallery');
var getGallery = require('../public/javascripts/getGalleryFromDB');

let gallery;

/* GET gallery page. */
router.get('/gallery', async function(req, res, next) {
  gallery = await getGallery();
  console.log('gallery', gallery);
  res.json(gallery);
});

/* POST request saving info to mongoDB */
router.post('/createRecord', async(req, res) => {
    let image = new Image({
      cloudinaryPayload: req.body.info,
      file: req.body.file,
      txHash: req.body.txHash,
      user: req.body.user,
      ethPrice: req.body.ethPrice,
    })
    image.save();
});

/* POST request sending image to cloudinary */
router.post('/postImage', (req, res) => {
  upload(req.body);
});

module.exports = router;
