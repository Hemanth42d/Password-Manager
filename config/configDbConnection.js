const mongoose = require("mongoose");
const config = require("config");

const connection = mongoose
    .connect(`${config.get("MONGODB_URI")}/passwordManager`)
    .then(()=>{
    })
    .catch((err)=>{
        console.log(err)
    })

module.exports.connection;