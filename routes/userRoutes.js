const express = require("express");
const router = express();

const { registerUser, loginUser, logoutUser, storePassword, changeDetails } = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const userModel = require("../models/user-model");
const passwordModel = require("../models/password-model");

router.get("/",  (req,res) => {
    res.render("home");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/home", isLoggedIn, async (req,res) => {
    try{
        let user = await userModel.findOne({ email : req.user.email });
        res.render("home", { user });
    }catch(err){
        res.send(err);
    }
})

router.get("/passwords", isLoggedIn, async (req,res) => {
    try{
        let passwordsDetails = await userModel.findOne({ email : req.user.email }).populate("passwords");
        res.render("passwords", { passwordsDetails });
    }catch(err){
        res.send(err);
    }
})

router.post("/store/password", isLoggedIn, storePassword);

router.get("/settings", isLoggedIn, async (req,res) => {
    try {
        let user = await userModel.findOne({ email : req.user.email });
        res.render("settings", { user });
    } catch (error) {
        res.send(error)
    }
})

router.get("/delete/:id", isLoggedIn, async (req,res) => {
    try {
        let passwordsDetails = await passwordModel.findOneAndDelete({ _id : req.params.id });
        res.redirect("/user/passwords");
    } catch (error) {
        res.send(error.message);
    }
})

router.post("/settings/changeDetails", isLoggedIn, changeDetails);

module.exports = router;