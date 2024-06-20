const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const itemsRouter = require("./items/router");

router.use("/items", itemsRouter);

// ROAD TO GET ALL THE ARTWORKS
const artworksRouter = require("./artworks/router");

router.use("/artworks", artworksRouter);

const membersRouter = require("./members/router");

router.use("/members", membersRouter);

/* ************************************************************************* */

module.exports = router;
