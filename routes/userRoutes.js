const express = require("express");
const router = express();

router.get("/", (req,res) => {
    res.render("home")
});

router.get("/passwords", (req,res) => {
    res.render("passwords")
})

module.exports = router;