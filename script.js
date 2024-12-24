const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter.js");
const usersRouter = require("./routes/userRoutes.js");
const cookieParser = require("cookie-parser");

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded( { extended : true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/user", usersRouter);

app.listen(3000, () => {
    console.log(`Port is running at https://localhost:${3000}`);
});