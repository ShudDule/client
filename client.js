require('dotenv').config();
const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Routes
app.use('/', authRoutes);
app.use('/', homeRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
