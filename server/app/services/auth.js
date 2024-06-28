const argon2 = require("argon2")
const jwt = require("jsonwebtoken");

const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
    timeCost: 2,
    parallelism: 1,
  };

const hashPassword = async (req, res, next) => {
    try {
      const { pwd } = req.body;
      const hashedPassword = await argon2.hash(pwd, hashingOptions);

      delete req.body.pwd;

      req.body.pwd = hashedPassword;
  
      next();
    } catch (err) {
      next(err);
    }
  };

  const verifyToken = (req, res, next) => {
    try {
      // Check that the "Authorization" header is present in the request
      const authorizationHeader = req.get("Authorization");
      
      if (authorizationHeader == null) {
        throw new Error("Authorization header is missing");
      }
  
      // // Check that the header has the form "Bearer <token>"
      const [type, token] = authorizationHeader.split(" ");
  
      if (type !== "Bearer") {
        throw new Error("Authorization header has not the 'Bearer' type");
      }
  
      // Check the validity of the token (its authenticity and expiry date)
      // If successful, the payload is extracted and decoded
      req.auth = jwt.verify(token, process.env.APP_SECRET);
  
      next();
    } catch (err) {
      console.error(err);
  
      res.sendStatus(401);
    }
  };

  module.exports= {hashPassword, verifyToken};