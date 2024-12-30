const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const passwordModel = require("../models/password-model");

module.exports.registerUser = async (req,res) => {
    try {
        let { email , password, userName } = req.body;
        let user = await userModel.findOne({ email });
        if(user) return res.status(304).send("You already have an account, please login");

        bcrypt.genSalt(10, (err,salt) =>{
            if(err) return res.status(101).send(err);
            bcrypt.hash(password, salt, async (err,hash) =>{
                if(err) return res.status(101).send(err);
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
        res.status(101).send(error);
    }
}

module.exports.loginUser = async (req,res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if(!user) return res.status(401).send("Something went wrong");
        bcrypt.compare(password, user.password, (err,result) => {
            if(err) res.status(101).send(err);
            bcrypt.compare(password, user.password, (err, result) => {
                if(err) res.status(101).send(err);
                if(result){
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.redirect("/user/home");
                }else{
                    res.status(101).send("Email or password is incorrect")
                }
            });
        });
    } catch (error) {
        res.status(101).send(error.message);
    }
}

module.exports.storePassword = async (req,res) => {
    try {
        let { websiteName , password } = req.body;
        
        let user = await userModel.findOne( { email : req.user.email });

        let passwordStore = await passwordModel.create({
            websiteName,
            password
        });
        user.passwords.push(passwordStore._id);
        await user.save();
        res.redirect("/user/home");
    } catch (error) {
        res.status(101).send(error.message);
    }
}
module.exports.changeDetails = async (req,res) => {
    try {
        let { userName, email, password } = req.body;
        bcrypt.genSalt(10, (err,salt) => {
            if(err) return res.status(505).send(err.message);
            bcrypt.hash(password, salt, async (err,hash) => {
                if(err) return res.status(505).send(err.message);
                let user = await userModel.findOneAndUpdate(
                    { email : req.user.email },
                    {
                        userName,
                        email,
                        password : hash
                    },
                    { new : true }
                );

                res.cookie("token", "");
                let token = generateToken(user);
                res.cookie("token", token);
                res.render("settings", { user });
            })
        })
    } catch (error) {
        res.status(101).send(error.message);
    }
}


module.exports.logoutUser = (req,res) => {
    try {
        let token = "";
        res.cookie("token", token);
        res.redirect("/");
    } catch (error) {
        res.status(101).send(error.message);
    }
}