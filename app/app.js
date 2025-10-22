const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const contentRouter = require('./routes/contentRoutes');
const blocksRouter = require('./routes/blocksRoutes');
const usersRouter = require('./routes/usersRoutes');
const rolesRouter = require('./routes/rolesRoutes');
const menusRouter = require('./routes/menusRoutes');
const loginRouter = require('./routes/loginRoutes');
const APIRouter = require('./routes/APIRoutes');
const settingsRouter = require('./routes/settingsRoutes');
const setupRouter = require('./routes/setupRoutes');
const logoutRouter = require('./routes/logoutRoutes');
const mediaRouter = require('./routes/mediaRoutes');
const collectionsRouter = require('./routes/collectionsRoutes');

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

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
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 8
  }
}));

// app.use((req, res, next) => {
//   req.session.authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik5pbHMiLCJ0ZW5hbnRJRCI6MSwiaWF0IjoxNzU4NzIxMjAxLCJleHAiOjE3NTg3NTAwMDF9.rzwFg3Wv4EbPfyAdbYsQB_adrXT6kU9qnmFmcJGyjZk';
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(checkUserExistence);

app.use('/login', protectLoginRoutes, loginRouter);

app.use(authenticateTokenBrowser);
app.use(loadPermissions);

app.use('/content', useFormatDate, contentRouter);
app.use('/blocks', useFormatDate, blocksRouter);
app.use('/users', checkRole('manageUsers'), usersRouter);
app.use('/roles', checkRole('manageRoles'), rolesRouter);
app.use('/menus', checkRole('manageMenus'), menusRouter);
app.use('/collections', collectionsRouter);
app.use('/settings', checkRole('manageSettings'), settingsRouter);
app.use('/media', checkRole('editContent'), mediaRouter);
app.use('/logout', logoutRouter);

app.use(invalidRouteHandler);
app.use(invalidJsonHandler);

module.exports = app;