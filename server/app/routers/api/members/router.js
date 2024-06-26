const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import member-related actions
const {
  browseRanking,
  browseMemberById,
  createMember,
  editMemberById,
} = require("../../../controllers/memberActions");

// Route to get a list of members
router.get("/ranked", browseRanking);

// Route to get a member by ID
router.get("/:id", browseMemberById);

// Route to get a new member
router.post("/new-member", createMember);

// Route to put a member informations
router.put("/edit-member/:id", editMemberById);

/* ************************************************************************* */

module.exports = router;
