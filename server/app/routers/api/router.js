const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const itemsRouter = require("./items/router");

router.use("/items", itemsRouter);

// ROAD FOR ARTWORKS
const artworksRouter = require("./artworks/router");

router.use("/artworks", artworksRouter);

// ROAD FOR MEMBERS
const membersRouter = require("./members/router");

router.use("/members", membersRouter);

// ROAD TO UPLOAD
const uploadRouter = require("./upload/router")

router.use("/upload", uploadRouter);

/* ************************************************************************* */

module.exports = router;
