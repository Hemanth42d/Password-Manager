const mongoose = require("mongoose");

const passwordSchema = mongoose.Schema({
    websiteName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

const passwordModel = mongoose.model("password", passwordSchema);

module.exports = passwordModel;

