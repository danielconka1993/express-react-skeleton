const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const dotenv = require("dotenv");

// Loading .env
dotenv.config();

// Getting a variable from .env
const secretKey = process.env.JWT_SECRET;

// JWT token for the given user (userId) with the secret key and sets the validity period
const signToken = (userId) => {
  return jwt.sign({ sub: userId }, secretKey, { expiresIn: "24h" });
};

const verifyToken = expressJwt({ secret: secretKey });

module.exports = { signToken, verifyToken };
