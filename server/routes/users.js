require('dotenv').config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const express = require("express");
const router = express.Router();

const pool = require('./utils/db');
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(Number(process.env.bcrypt_saltRounds));
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
        await pool.query("INSERT INTO users(email, hashed_password) VALUES($1, $2)", [email, hashedPassword]);
        const token = jwt.sign( {email}, 'secret', { expiresIn: '1hr' } );
        res.json({ email, token });
    } catch(err) {
        console.error(err);
        if (err) {
            res.json({ detail: err.detail });
        }
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (!user.rows.length) {
            res.json({detail: "User does not exit"});
        }
        const success = await bcrypt.compare(password, user.rows[0].hashed_password);
        if (success) {
            const token = jwt.sign( {email}, 'secret', { expiresIn: '1hr' } );
            res.json({ email, token });
        } else {
            res.json({detail: "Login failed"});
        }
    } catch(err) {
        console.error(err);
        res.json({ detail: err.detail });
    }
});

module.exports = router;