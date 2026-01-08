const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Hashing password
const hashPassword = async (password) => {
  const saltRounds = 10; // Number of salt rounds to use for hashing
  const hashedPassword = await bcryptjs.hash(password, saltRounds);
  return hashedPassword;
};

const generateToken = async (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

module.exports = {
  hashPassword,
  generateToken,
};
