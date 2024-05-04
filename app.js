const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");



// INIT
dotenv.config();
const app = express();





// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



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