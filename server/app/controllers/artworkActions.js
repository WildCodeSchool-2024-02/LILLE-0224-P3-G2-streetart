// Import access to database tables
const tables = require("../../database/tables");

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the artwork data from the request body
  const artwork = req.body;

  try {
    // Insert the artwork into the database
    const insertId = await tables.artwork.create(artwork);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted artwork
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const artworks = await tables.artwork.readAll();

    // Respond with the items in JSON format
    res.json(artworks);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const browseMemberArtwork = async (req, res, next) => {
  try {
    // Fetch a specific artwork from the database based on the provided ID
    const artworks = await tables.artwork.readAllMemberArtwork(req.params.id);

    // If the artwork is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the artwork in JSON format
    if (artworks == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(artworks);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    // Fetch a specific artwork from the database based on the provided ID
    const artwork = await tables.artwork.read(req.params.id);

    // If the artwork is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the artwork in JSON format
    if (artwork == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(artwork);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const updateArtwork = async (req, res, next) => {
  const { dateOperationReport, idAccountFk, idArtwork } = req.body;

  try {
    // Fetch a specific artwork from the database based on the provided ID
    const artwork = await tables.artwork.reportArtwork(
      req.params.id,
      dateOperationReport,
      idAccountFk,
      idArtwork
    );

    // If the artwork is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the artwork in JSON format
    if (artwork == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(artwork);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  browse,
  browseMemberArtwork,
  read,
  add,
  updateArtwork,
};
