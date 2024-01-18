const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
const token = req.cookies.token;

  if (!token) {
    return res.status(401).json("You are not authenticated!");
  }

  jwt.verify(token, process.env.SECRET, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(403).json("Token is not valid!");
    }
    console.log("Decoded Token:", data);
    req.userId = data._id;
    console.log("User ID from Token:", req.userId);
    next();
  });
};

module.exports = verifyToken;
