const express = require("express");
const router = express();

const { registerUser, loginUser, logoutUser } = require("../controllers/authController");

router.get("/",  (req,res) => {
    res.render("home");
});

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/logout", logoutUser);

router.get("/user/home", (req,res) => {
    res.render("home");
})

router.get("/passwords", (req,res) => {
    res.render("passwords");
})

router.get("/settings", (req,res) => {
    res.render("settings");
})

module.exports = router;