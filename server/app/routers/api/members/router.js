const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browseRanking } = require("../../../controllers/memberActions");

// Route to get a list of members
router.get("/", browseRanking);


/* ************************************************************************* */

module.exports = router;
