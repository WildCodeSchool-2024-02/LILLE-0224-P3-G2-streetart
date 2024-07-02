const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import account-related actions
const { banAccountById } = require("../../../controllers/accountActions");

// Route to ban an Account depend on id_member
router.put("/ban/:id", banAccountById);

/* ************************************************************************* */

module.exports = router;
