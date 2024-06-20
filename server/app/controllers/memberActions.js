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

const browseMemberById = async (req, res, next) => {
  try {
      // Fetch a specific category from the database based on the provided ID
      const member = await tables.member.readMember(req.params.id);
  
      // If the category is not found, respond with HTTP 404 (Not Found)
      // Otherwise, respond with the category in JSON format
      if (member == null) {
        res.sendStatus(404);
      } else {
        res.status(200).json(member);
      }
    } catch (err) {
      // Pass any errors to the error-handling middleware
      next(err);
    }
  };



// Ready to export the controller functions
module.exports = {
  browseRanking,
  browseMemberById,
};
