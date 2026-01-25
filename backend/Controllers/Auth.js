const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../Models/db");

async function signup(req, res) {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await db.execute(
    "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
    [name, email, hashedPassword]
  );

  const token = jwt.sign({ userId: result.insertId }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.status(201).json({ token });
}

async function login(req, res) {
  const { email, password } = req.body;

  const [[user]] = await db.execute(
    "SELECT id, password_hash FROM users WHERE email = ?",
    [email]
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.json({ token });
}

module.exports = {
  signup,
  login,
};
