var express = require('express');
var router = express.Router();

var Image = require('../public/models/schema');

router.post('/api/createRecord', async(req, res) => {
    let image = new Image({
      cloudinaryPayload: req.body.info,
      txHash: req.body.txHash,
      user: req.body.user,
    })
    image.save();
});

module.exports = router;