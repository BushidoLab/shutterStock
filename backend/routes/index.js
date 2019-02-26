require('dotenv').config();
var express = require('express');
var router = express.Router();

var Image = require('../public/models/schema');

// Functions
// var getGallery = require('../public/javascripts/getGallery'); // Getting gallery from cloudinary
var getGallery = require('../public/javascripts/getGalleryFromDB'); // Getting gallery from MongoDB

let gallery;

/* GET gallery page. */
router.get('/gallery', async function(req, res, next) {
  gallery = await getGallery();
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
      owners: req.body.owners,
    })
    image.save();
});

/* POST request adding a user to the owners array */
router.post('/addOwner', async(req, res) => {
  console.log('request body: ', req.body)
  Image.findById(req.body.id, function(err, res) {
    if (err) {
      return err;
    }
    
    res.owners.push(req.body.address);
    res.save();
  });
});

module.exports = router;
