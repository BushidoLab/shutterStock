var axios = require("axios");

function postImage(body) {
    let data = body;
    // axios.post("https://api.cloudinary.com/v1_1/diegolealb/upload", data)
    //     .then(res => {
    //         console.log(res);
    //     })
    //     .catch(err => {
    //         console.error("ERROR", err.request);
    //     });

    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open('POST', "https://api.cloudinary.com/v1_1/diegolealb/upload", true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
};

module.exports = postImage;