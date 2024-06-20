const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import artwork-related actions
const { add } = require("../../../controllers/artworkActions");

// Route to add a new artwork
router.post("/", add);

/* ************************************************************************* */

module.exports = router;