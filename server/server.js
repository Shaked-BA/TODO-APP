require('dotenv').config();
const express = require('express');
const cors = require('cors');

const todos = require("./routes/todos");

const port = 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/todos", todos);

app.listen(port, () => console.log(`Server is listening on port ${port}`));