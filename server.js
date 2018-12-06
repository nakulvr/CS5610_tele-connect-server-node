const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With");
    next();
});
require('./db/database')();
// app.get('/hello', function(req, res){
//     res.send('hello world');
// });
const userService = require('./services/user.service.server');
userService(app);

const tvseriesService = require('./services/tvseries.service.server');
tvseriesService(app);

const commentService = require('./services/comment.service.server');
commentService(app);

app.listen(process.env.PORT || 3000);
