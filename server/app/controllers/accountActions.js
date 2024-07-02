const tables = require("../../database/tables");

// The E of BREAD - Edit (Update) operation
const banAccountById = async (req, res, next) => {
  const accountUpdate = { ...req.body, id: req.params.id };

  try {
    // Update the category in the database
    await tables.account.updateBanAccount(accountUpdate);
    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  banAccountById,
};
