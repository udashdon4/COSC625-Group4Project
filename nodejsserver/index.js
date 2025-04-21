// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import CORS
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

const app = express();
const port = process.env.PORT || 5000;

const db = require('./db');

// Middleware to enable CORS
app.use(cors({
  origin: "https://cosc625-group4project.onrender.com:3000", 
  credentials: true                
}));
app.use(cors({
  origin: 'https://hollywoodchase.github.io',
  credentials: true
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
// Increase limit to handle profile image in Base64 (e.g. 2MB)
app.use(express.json({ limit: '5mb' }));

// Test Database Connection Endpoint
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Root Endpoint (for testing purposes)
app.get('/', (req, res) => {
  res.send('Backend is running');
});

/* Users Routes */
// Endpoint to get all user accounts
app.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM user_accounts');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Endpoint to create a new user (Signup)
app.post('/users', async (req, res) => {
  const { username, password, secret, fav_park, profile_image } = req.body;
  try {
    // Hash the password with a salt round of 10
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO user_accounts (username, password, secret, fav_park, profile_image) VALUES (?, ?, ?, ?, ?)',
      [username, hashedPassword, secret, fav_park, profile_image || null]
    );
    res.json({ message: 'User created successfully', userId: result[0].insertId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// New Login Endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body; // ✅ updated from email to username
  try {
    const normalizedUsername = username.trim().toLowerCase(); // optional: normalize case
    const [users] = await db.query(
      'SELECT * FROM user_accounts WHERE LOWER(username) = ?',
      [normalizedUsername]
    );
    if (users.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }
    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    res.json({ message: 'Login successful', userId: user.user_id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});


// NEW: Recover Account Endpoint
app.post('/recover', async (req, res) => {
  const { username, secretWord } = req.body; // ✅ updated from email to username
  try {
    const [users] = await db.query(
      'SELECT * FROM user_accounts WHERE username = ?',
      [username.trim()]
    );
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = users[0];
    if (user.secret.trim().toLowerCase() !== secretWord.trim().toLowerCase()) {
      return res.status(401).json({ error: 'Incorrect secret word' });
    }
    res.json({ message: 'Account recovery successful', userId: user.user_id });
  } catch (error) {
    console.error('Recovery error:', error);
    res.status(500).json({ error: 'Failed to recover account' });
  }
});


// NEW: Get Account Settings for a User by ID
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const [rows] = await db.query(
      'SELECT user_id, username, secret, fav_park, profile_image FROM user_accounts WHERE user_id = ?',
      [userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching user settings:', error);
    res.status(500).json({ error: 'Failed to fetch user settings' });
  }
});

// NEW: Update Account Settings for a User by ID
app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  // Fields to update: password, secret, fav_park, profile_image.
  const { password, secret, fav_park, profile_image } = req.body;
  try {
    // Fetch the existing user record
    const [users] = await db.query('SELECT * FROM user_accounts WHERE user_id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    let newPassword = users[0].password;
    if (password && password.trim().length > 0) {
      newPassword = await bcrypt.hash(password, 10);
    }
    await db.query(
      'UPDATE user_accounts SET password = ?, secret = ?, fav_park = ?, profile_image = ? WHERE user_id = ?',
      [
        newPassword,
        secret !== undefined ? secret : users[0].secret,
        fav_park !== undefined ? fav_park : users[0].fav_park,
        profile_image !== undefined ? profile_image : users[0].profile_image,
        userId,
      ]
    );
    res.json({ message: 'User settings updated successfully' });
  } catch (error) {
    console.error('Error updating user settings:', error);
    res.status(500).json({ error: 'Failed to update user settings' });
  }
});

/* Liked Parks Routes */
// Endpoint to get all liked parks
app.get('/liked-parks', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM liked_parks');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching liked parks:', error);
    res.status(500).json({ error: 'Failed to fetch liked parks' });
  }
});

// Endpoint to add a new liked park for a user
app.post('/liked-parks', async (req, res) => {
  const { user_ID, liked_park } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO liked_parks (user_ID, liked_park) VALUES (?, ?)',
      [user_ID, liked_park]
    );
    res.json({ message: 'Liked park added', likedParkId: result[0].insertId });
  } catch (error) {
    console.error('Error adding liked park:', error);
    res.status(500).json({ error: 'Failed to add liked park' });
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
