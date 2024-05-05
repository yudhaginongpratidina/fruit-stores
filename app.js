const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");
const methodOverride = require("method-override");



// INIT
dotenv.config();
const app = express();





// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));



// VIEWS CONFIG DAN STATIC FILES
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("public", path.join(__dirname, "public"));



// ROUTES IMPORT
const webRoute = require("./routes/web-route");



// ROUTES DEFINITION
app.use("/", webRoute);




// APP LISTEN
const HOSTNAME = process.env.APP_HOST || "localhost";
const PORT = process.env.APP_PORT || 3000;


app.listen(PORT, () => {
    console.log(`Listening on http://${HOSTNAME}:${PORT}`);
})