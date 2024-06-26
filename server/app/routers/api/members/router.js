const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import member-related actions
const {
  browseRanking,
  browseMemberById,
  createMember
} = require("../../../controllers/memberActions");

const { hashPassword, verifyToken } = require("../../../services/auth")

// Route to get a list of members
router.get("/ranked", browseRanking);

// Route to get a member by ID
router.get("/:id", verifyToken, browseMemberById);

// Route to get a new member
router.post("/new-member", hashPassword, createMember);

/* ************************************************************************* */

module.exports = router;
