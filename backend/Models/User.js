const db = require('../config/db');

function findByEmail(email) {
  return db.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
}

function createUser(name, email, passwordHash) {
  return db.execute(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, passwordHash]
  );
}

module.exports = { findByEmail, createUser };
