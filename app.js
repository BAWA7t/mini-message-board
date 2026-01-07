//import express into the file
const express = require("express");
//import the path module to locate files in the app
const path = require("path");

const indexRouter = require("./routes/index");

//Start express
const app = express();
const PORT = process.env.PORT || 3000;

//set up ejs template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/", indexRouter);

//start server
app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});
