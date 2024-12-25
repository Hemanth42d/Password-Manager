const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const passwordModel = require("../models/password-model");

module.exports.registerUser = async (req,res) => {
    try {
        let { email , password, userName } = req.body;
        console.log(userName);
        let user = await userModel.findOne({ email });
        if(user) return res.status(401).send("You already have an account, please login");

        bcrypt.genSalt(10, (err,salt) =>{
            if(err) return res.send(err);
            bcrypt.hash(password, salt, async (err,hash) =>{
                if(err) return res.send(err);
                let user = await userModel.create({
                    email ,
                    password : hash,
                    userName
                });
                let token = generateToken(user);
                res.cookie("token", token);
                res.redirect("/user/home");
            })
        })
    } catch (error) {
        res.send(error);
    }
}

module.exports.loginUser = async (req,res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if(!user) return res.status(401).send("Something went wrong");
        bcrypt.compare(password, user.password, (err,result) => {
            if(err) return res.status(401).send("Something went wrong");

            let token = generateToken(user);
            res.cookie("token", token);
            console.log(user);
            res.redirect("/user/home");
        })
    } catch (error) {
        res.send(error.message);
    }
}

module.exports.storePassword = async (req,res) => {
    try {
        let { websiteName , password } = req.body;

        let passwordStore = await passwordModel.create({
            websiteName,
            password
        });
        res.send(passwordStore);
    } catch (error) {
        res.send(error.message);
    }
}


module.exports.logoutUser = (req,res) => {
    let token = "";
    res.cookie("token", token);
    res.redirect("/");
}