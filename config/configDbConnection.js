const mongoose = require("mongoose");

const connection = mongoose
    .connect(`mongodb+srv://venkatahemanth42d:kUCdEy0y38lp9Rus@passwordmanagerdb.hmf8k.mongodb.net/?retryWrites=true&w=majority&appName=PasswordManagerDb`)
    .then(()=>{
        console.log("connected");
    })
    .catch((err)=>{
        console.log(err)
    })

module.exports = connection;