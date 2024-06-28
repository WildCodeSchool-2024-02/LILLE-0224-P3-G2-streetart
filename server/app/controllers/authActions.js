// Import access to database tables
const argon2 = require("argon2")
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const login = async (req, res, next) => {
    
    try {
        // Fetch a specific user from the database based on the provided email
        const account = await tables.account.readByEmail(req.body.email);
        const verified = await argon2.verify(account.pwd, req.body.pwd);

        if (verified) {
        // Respond with the user in JSON format (but without the hashed password)
        delete account.pwd;
        
        const token = await jwt.sign(
          // PAYLOAD
            { sub: account.id },
            process.env.APP_SECRET,
            {
              expiresIn: "1h",
            }
          );
        
          res.json({
            token,
            account,
          });
      } else {
        res.sendStatus(422);
      }    

  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  login,
};
