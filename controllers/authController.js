const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

module.exports.registerUser = async (req,res) => {
    try {
        let { email , password, userName } = req.body;
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
        if(!user) return res.status(401).send("No User Found");
        bcrypt.compare(password, user.password, (err,result) => {
            if(err) return res.status(401).send(err.message);

            let token = generateToken(user);
            res.cookie("token", token);
            res.send("Succesfullt loged in")
            // res.redirect("/user/home");
        })
    } catch (error) {
        res.send(error.message);
    }
}

module.exports.logoutUser = (req,res) => {
    let token = "";
    res.cookie("token", token);
    res.send("Loggoed Out");
    // res.redirect("/");
}