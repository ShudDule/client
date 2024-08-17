const bcrypt = require('bcryptjs');
const fs = require('fs');

let users = [];

if (fs.existsSync('data.json')) {
    users = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
}

exports.showRegisterPage = (req, res) => {
    res.render('register');
};

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.render('register', { message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    fs.writeFileSync('data.json', JSON.stringify(users, null, 2));

    res.redirect('/login');
};

exports.showLoginPage = (req, res) => {
    res.render('login');
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.render('login', { message: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.render('login', { message: 'Invalid username or password' });
    }

    req.session.user = user;
    res.redirect('/home');
};

exports.logoutUser = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};
