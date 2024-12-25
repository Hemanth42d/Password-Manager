const mongoose = require("mongoose");

const passwordSchema = mongoose.Schema({
    websiteName : String,
    password : String
});

const passwordModel = mongoose.model("password", passwordSchema);

module.exports = passwordModel;