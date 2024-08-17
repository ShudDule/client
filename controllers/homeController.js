exports.showHomePage = (req, res) => {
    res.render('home', { username: req.session.user.username });
};
