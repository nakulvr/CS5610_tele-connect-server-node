const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
require('./db/database')();
const session = require('express-session');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));
setSession = (req, res) => {
    let name = req.params['name'];
    req.session[name] = req.params['value'];
    res.send(req.session);
};
setSessionObject = (req, res) => {
    let name = req.params['name'];
    req.session[name] = req.body;
    res.send(req.session);
};
getSession = (req, res) => {
    let name = req.params['name'];
    let value = req.session[name];
    res.send(value);
};

getSessionAll = (req, res) => {
  res.send(req.session);
};

resetAllSessions = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};
// app.get('/hello', function(req, res){
//     res.send('hello world');
// });
const userService = require('./services/user.service.server');
userService(app);

const tvseriesService = require('./services/tvseries.service.server');
tvseriesService(app);

const commentService = require('./services/comment.service.server');
commentService(app);

app.get('/api/session/set/:name/:value', setSession);
app.post('/api/session/set/:name', setSessionObject);
app.get('/api/session/get/:name', getSession);
app.get('/api/session/get', getSessionAll);
app.get('/api/session/reset', resetAllSessions);

app.listen(process.env.PORT || 3000);
