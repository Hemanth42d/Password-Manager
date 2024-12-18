const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());
app.set("view engine", "ejs");


app.get("/", (req,res) => {
    res.render("index");
});



app.listen(3000, () => {
    console.log(`Port is running at https://localhost:${3000}`);
})