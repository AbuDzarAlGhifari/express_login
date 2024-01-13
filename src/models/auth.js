const db = require('../config/database');

function registerUser(name, password, callback) {
  db.query(`INSERT INTO auth (name, password) 
            VALUE ('${name}', '${password}')`, 
            [name, password], callback);
}

function loginUser(name, password, callback) {
  db.query(`SELECT * FROM auth WHERE name='${name}' AND password='${password}'`,
            [name, password], callback);
}

const tokenBlacklist = new Set();

function addToBlacklist(expirationTime) {
  tokenBlacklist.add(expirationTime);
}

function isTokenBlacklisted(expirationTime) {
  return tokenBlacklist.has(expirationTime);
}

module.exports = { 
  registerUser, 
  loginUser,
  addToBlacklist,
  isTokenBlacklisted
};

