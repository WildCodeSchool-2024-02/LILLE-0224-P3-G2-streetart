const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browseMembersByDate = async (req, res, next) => {
  try {
    const members = await tables.member.readAllMembersByDate();
    res.json(members);
  } catch (err) {
    next(err);
  }
};

const browseRanking = async (req, res, next) => {
  try {
    const members = await tables.member.readAllRanked();
    res.json(members);
  } catch (err) {
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

// The A of BREAD - Add (Create) operation
const createMember = async (req, res, next) => {
  const { pseudo, firstname, lastname, city, postcode, email, pwd, date } =
    req.body;

  try {
    const member = {
      pseudo,
      firstname,
      lastname,
      city,
      postcode,
      email,
      pwd,
      date,
    };
    const insertId = await tables.member.create(member);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const editMemberById = async (req, res, next) => {
  const memberUpdate = { ...req.body, id: req.params.id };

  try {
    // Update the category in the database
    await tables.member.updateMember(memberUpdate);
    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  browseMembersByDate,
  browseRanking,
  browseMemberById,
  createMember,
  editMemberById,
};
