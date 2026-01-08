const jwt = require("jsonwebtoken");
const { secret } = require("../constrant/general.con");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("verifyToken error", error);
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = { verifyToken };
