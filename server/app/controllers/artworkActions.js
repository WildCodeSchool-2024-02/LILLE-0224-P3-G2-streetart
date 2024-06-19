// Import access to database tables
const tables = require("../../database/tables");

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
        // Fetch a specific category from the database based on the provided ID
        const artwork = await tables.artwork.readAllMemberArtwork(req.params.id);
    
        // If the category is not found, respond with HTTP 404 (Not Found)
        // Otherwise, respond with the category in JSON format
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
  browseMemberArtwork
};
