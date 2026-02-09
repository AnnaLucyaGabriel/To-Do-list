const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.send('Signup failed');
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.send('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.send('Invalid password');

        req.session.userId = user._id;
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.send('Login error');
    }
};
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};
