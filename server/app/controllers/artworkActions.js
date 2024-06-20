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

module.exports = {
  add
};
