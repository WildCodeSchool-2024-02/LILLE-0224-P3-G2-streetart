const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const itemsRouter = require("./items/router");

router.use("/items", itemsRouter);

const artworksRouter = require("./artworks/router")

router.use("/artworks", artworksRouter)

/* ************************************************************************* */

module.exports = router;
