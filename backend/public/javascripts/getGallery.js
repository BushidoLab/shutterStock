var axios = require('axios');

const CLOUDINARY_URL=process.env.CLOUDINARY_URL;
let gallery;

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

module.exports = getGallery;