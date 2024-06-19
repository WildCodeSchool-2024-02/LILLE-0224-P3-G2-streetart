const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const itemsRouter = require("./items/router");

router.use("/items", itemsRouter);

const membersRouter = require("./members/router");

router.use("/members-ranked", membersRouter);

/* ************************************************************************* */

module.exports = router;
