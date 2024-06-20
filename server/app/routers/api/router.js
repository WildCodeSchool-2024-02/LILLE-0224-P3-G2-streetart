const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const itemsRouter = require("./items/router");

router.use("/items", itemsRouter);

const artworkRouter = require("./artworks/router")

router.use("/artworks", artworkRouter)

const uploadRouter = require("./upload/router")

router.use("/upload", uploadRouter);

/* ************************************************************************* */

module.exports = router;
