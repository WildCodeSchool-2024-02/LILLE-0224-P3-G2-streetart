const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, browseMemberArtwork, read, add } = require("../../../controllers/artworkActions");

const { verifyToken } = require("../../../services/auth")

// Route to get a list of artworks
router.get("/", browse);

// Route to get one specific artwork with user info
router.get("/:id", read)

// Route to get a list of artwork of the profile
router.get("/profile/:id", verifyToken, browseMemberArtwork);

// Route to add a new artwork
router.post("/", add);

/* ************************************************************************* */

module.exports = router;