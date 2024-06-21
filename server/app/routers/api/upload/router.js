const express = require('express');

const router = express.Router();

const { addArtwork } = require('../../../controllers/uploadActions');

router.post('/', addArtwork);

module.exports = router;