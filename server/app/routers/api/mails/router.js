const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import mail-related actions
const { sendEmailRecoverPwd, sendEmailWelcome, sendEmailContact, sendEmailContactSla, } = require("../../../controllers/mailActions")

// Route to send a welcome email
router.post("/welcome", sendEmailWelcome)

// Route to send an email for recover her password
router.post("/recover-password", sendEmailRecoverPwd)

router.post("/contact", sendEmailContact, sendEmailContactSla)

/* ************************************************************************* */

module.exports = router;
