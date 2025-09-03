// Load environment variables
require('dotenv').config();

const passport = require('passport');

// DB connection
require('./config/db-connection')

const express = require('express');

const authRouter = require('./routes/users-route');
const bookmarkRouter = require('./routes/bookmarks-route');

// Invoke that imported express method to create a new Express application, and I'm storing it inside of this variable app
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

app.use(passport.initialize());

app.use('/api/users', authRouter);
app.use('/api/bookmarks', bookmarkRouter);

// load strategies
require('./config/jwt-strategy');
require('./config/github-strategy');

// Get our server running
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});