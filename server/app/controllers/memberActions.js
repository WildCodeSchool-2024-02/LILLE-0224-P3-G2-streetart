const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browseRanking = async (req, res, next) => {
  try {
    const members = await tables.member.readAll();
    res.json(members);
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const createMember = async (req, res, next) => {
  const { pseudo, firstname, lastname, city, postcode, email, pwd } = req.body;

  try {
    const member = { pseudo, firstname, lastname, city, postcode, email, pwd };
    const insertId = await tables.member.create(member);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browseRanking,
  createMember,
};
