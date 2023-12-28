const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const dotenv = require('dotenv');

// Načtěte proměnné z .env souboru
dotenv.config();

// Získání tajného klíče ze .env nebo defaultní hodnoty
const secretKey = process.env.JWT_SECRET;

//Definuje funkci signToken, která vytváří JWT token pro daného uživatele (userId) s podpisem pomocí tajného klíče a nastavuje dobu platnosti na jednu hodinu.
const signToken = (userId) => {
  return jwt.sign({ sub: userId }, secretKey, { expiresIn: '1h' });
};
// Vytváří middleware verifyToken, který ověřuje platnost JWT tokenu pomocí tajného klíče.


const verifyToken = expressJwt({ secret: secretKey });

module.exports = { signToken, verifyToken };