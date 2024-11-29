const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const contentRouter = require('./routes/contentRoutes');
const blocksRouter = require('./routes/blocksRoutes');
const usersRouter = require('./routes/usersRoutes');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/',(req, res) => {
    if (req.accepts('html')) {
        res.redirect('/content');
    }
})

app.use('/content',contentRouter);
app.use('/blocks',blocksRouter);
app.use('/users',usersRouter);

app.listen(5500, () => {
    console.log(`Decupla running on port 5500`);
})