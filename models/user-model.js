const mongoose = require("mongoose");
const connection = require("../config/configDbConnection");

const userSchema = mongoose.Schema({
    userName : String,
    email : String,
    password : String
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;