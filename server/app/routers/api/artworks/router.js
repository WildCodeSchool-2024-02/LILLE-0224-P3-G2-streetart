const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse } = require("../../../controllers/artworkActions");

// Route to get a list of artworks
router.get("/", browse);

const { browseMemberArtwork } = require("../../../controllers/artworkActions");

// Route to get a list of items
router.get("/profile/:id", browseMemberArtwork);

/* ************************************************************************* */

module.exports = router;
