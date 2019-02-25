var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    user: String, // Ethereum address of the user
    txHash: String, // Contains eth txHash
    cloudinaryPayload: Object, // Entire cloudinary payload
    ethPrice: Number, 
    file: Object,
    owners: [String],
});

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;