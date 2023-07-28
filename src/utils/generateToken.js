const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
  return token;
};

module.exports = generateToken;
