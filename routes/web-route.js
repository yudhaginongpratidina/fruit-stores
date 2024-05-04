// LIBRARIES
const express = require("express");
const router = express.Router();


// DEFINING ROUTES
router.get("/", (req, res) => {
    res.json("Hello World");
})


// EXPORT
module.exports = router