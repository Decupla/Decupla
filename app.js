const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const contentRouter = require('./routes/contentRoutes');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/',(req, res) => {
    if (req.accepts('html')) {
        res.redirect('/content');
    }
})

app.use('/content',contentRouter);

app.listen(5500, () => {
    console.log(`Decupla running on port 5500`);
})