const express = require("express");
const router = express();

const { registerUser, loginUser, logoutUser, storePassword } = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const userModel = require("../models/user-model");

router.get("/",  (req,res) => {
    res.render("home");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/home", isLoggedIn, async (req,res) => {
    let user = await userModel.findOne({ email : req.user.email });
    res.render("home", { user });
})

router.get("/passwords", isLoggedIn, async (req,res) => {
    let user = await userModel.findOne({ email : req.user.email });
    res.render("passwords", { user });
})

router.post("/store/password", isLoggedIn, storePassword);

router.get("/settings", isLoggedIn, async (req,res) => {
    let user = await userModel.findOne({ email : req.user.email });
    res.render("settings", { user });
})

module.exports = router;