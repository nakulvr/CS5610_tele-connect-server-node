const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

require('./db/database')();
// app.get('/hello', function(req, res){
//     res.send('hello world');
// });
app.listen(process.env.PORT || 3000);
