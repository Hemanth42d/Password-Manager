const express = require("express");
const router = express();

router.get("/", (req,res) => {
    res.render("home");
});

router.get("/passwords", (req,res) => {
    res.render("passwords");
})

router.get("/settings", (req,res) => {
    res.render("settings");
})

module.exports = router;