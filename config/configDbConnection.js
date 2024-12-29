const mongoose = require("mongoose");
const config = require("config");

const connection = mongoose
    .connect(config.get("MONGODB_URI"))
    .then(()=>{
        console.log("connected");
    })
    .catch((err)=>{
        console.log(err)
    })

module.exports = connection;