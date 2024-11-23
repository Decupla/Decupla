const express = require('express');
const sqlite = require('sqlite3');
const fs = require('fs');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Decupla');
})

app.listen(5500, () => {
    console.log(`Decupla running on port 5500`);
})