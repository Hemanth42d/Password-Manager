const express = require("express");
const router = express.Router();

router.get("/", (req,res,next) => {
    try {
        res.render("index");
    } catch (error) {
        res.status(101).send(error);
    }
});

module.exports = router;