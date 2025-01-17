const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const session = require('express-session');

const contentRouter = require('./routes/contentRoutes');
const blocksRouter = require('./routes/blocksRoutes');
const usersRouter = require('./routes/usersRoutes');
const rolesRouter = require('./routes/rolesRoutes');
const menusRouter = require('./routes/menusRoutes');
const loginRouter = require('./routes/loginRoutes');
const APIRouter = require('./routes/APIRoutes');
const settingsRouter = require('./routes/settingsRoutes');
const setupRouter = require('./routes/setupRoutes');

const invalidRouteHandler = require('./middleware/invalidRouteHandler');
const authenticateTokenBrowser = require('./middleware/authenticateTokenBrowser');
const loadPermissions = require('./middleware/loadPermissions');
const checkRole = require('./middleware/checkRole');
const invalidJsonHandler = require('./middleware/indvalidJsonHandler');
const useFormatDate = require('./middleware/useFormatDate');
const validateAPIKey = require('./middleware/validateAPIKey');
const checkUserExistence = require('./middleware/checkUserExistence');
const protectSetupRoutes = require('./middleware/protectSetupRoutes');
const protectLoginRoutes = require('./middleware/protectLoginRoutes');

const app = express();

dotenv.config();

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
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// app.use((req, res, next) => {
//   req.session.authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik5pbHMiLCJpYXQiOjE3MzUzMTYzNjZ9.jIO6ZX1KS_HKt7LelEk3-QcHgcDVnfKwkuO2J1G-nrk';
//   next();
// });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.get('/', (req, res) => {
  if (req.accepts('html')) {
    res.redirect('/content');
  }
})

app.use('/api', validateAPIKey, APIRouter);
app.use('/setup', protectSetupRoutes, setupRouter);

app.use(checkUserExistence);

app.use('/login', protectLoginRoutes, loginRouter);

app.use(authenticateTokenBrowser);
app.use(loadPermissions);

app.use('/content', useFormatDate, contentRouter);
app.use('/blocks', useFormatDate, checkRole('manageBlocks'), blocksRouter);
app.use('/users', checkRole('manageUsers'), usersRouter);
app.use('/roles', checkRole('manageRoles'), rolesRouter);
app.use('/menus', checkRole('manageMenus'), menusRouter);
app.use('/settings', checkRole('manageSettings'), settingsRouter);

app.use(invalidRouteHandler);
app.use(invalidJsonHandler);

module.exports = app;