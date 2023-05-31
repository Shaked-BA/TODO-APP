require('dotenv').config();
const pool = require('./utils/db');
const { v4:uuidv4 } = require('uuid');

const express = require("express");
const router = express.Router();

router.get('/:userEmail', async (req, res) => {
    const { userEmail } = req.params;
    try {
        const todos = await pool.query("SELECT * FROM todos WHERE user_email = $1", [userEmail]);
        res.json(todos.rows);
    } catch (err) {
        console.error(err);
    }
});

router.post('/create', async (req, res) => {
    const { user_email, title, progress, date } = req.body;
    const id = uuidv4();
    try {
        const newTodo = await pool.query("INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)", [id, user_email, title, progress, date]);
        res.send(newTodo);
    } catch (err) {
        console.error(err);
    }
});

router.put('/edit', async (req, res) => {
    const { id, user_email, title, progress, date } = req.body;
    try {
        const updatedTodo = await pool.query("UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;", [user_email, title, progress, date, id]);
        res.send(updatedTodo);
    } catch (err) {
        console.error(err);
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTodo = await pool.query("DELETE FROM todos WHERE id = $1", [id]);
        res.send(deletedTodo);
    } catch (err) {
        console.error(err);
    }
});


module.exports = router;