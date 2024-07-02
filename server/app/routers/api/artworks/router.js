const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  browseMemberArtwork,
  updateArtwork,
  browseArtworksNotValidate,
  readArtworksNotValidate,
  read,
  add,
  validateNewArtwork,
  denyNewArtwork,
} = require("../../../controllers/artworkActions");

const { verifyToken } = require("../../../services/auth");

// Route to get a list of artworks
router.get("/", browse);

// Route to get all artworks not validate
router.get("/not-validate", browseArtworksNotValidate);

// Route to get artwork by id not validate
router.get("/not-validate/:id", readArtworksNotValidate);

// Route to validate a new artwork
router.post("/not-validate/:id/validate", validateNewArtwork);

// Route to deny a new artwork
router.delete("/not-validate/:id/deny", denyNewArtwork);

// Route to get one specific artwork with user info
router.get("/:id", read);

// Route to get a list of artwork of the profile
router.get("/profile/:id", verifyToken, browseMemberArtwork);

// Route to add a new artwork
router.post("/", add);

// Route to report a new artwork
router.post("/:id/report", updateArtwork);

/* ************************************************************************* */

module.exports = router;
