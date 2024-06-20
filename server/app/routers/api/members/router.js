const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browseRanking } = require("../../../controllers/memberActions");

// Route to get a list of members
router.get("/ranked", browseRanking);

// Import item-related actions
const { browseMemberById } = require("../../../controllers/memberActions");

// Route to get a member by ID
router.get("/:id", browseMemberById);



/* ************************************************************************* */

module.exports = router;
