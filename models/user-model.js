const mongoose = require("mongoose");
const connection = require("../config/configDbConnection");

const userSchema = mongoose.Schema({
    userName : String,
    email : String,
    password : {
        type  : String,
        required : true
    },
    passwords : [
        {
            type : mongoose.Types.ObjectId,
            ref : "password",
            default : []
        }
    ]
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;