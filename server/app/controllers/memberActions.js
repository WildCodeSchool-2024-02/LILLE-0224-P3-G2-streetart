// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browseRanking = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const members = await tables.member.readAll();

    // Respond with the members in JSON format
    res.json(members);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};



// Ready to export the controller functions
module.exports = {
  browseRanking,
};
