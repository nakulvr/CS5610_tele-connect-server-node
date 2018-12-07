module.exports = () => {
    const mongoose = require('mongoose')
    mongoose.set('useCreateIndex', true);
    const databaseName = 'tele-connect';
    let connectionString = 'mongodb://localhost/';
    connectionString += databaseName;
    // let connectionString = 'mongodb://admin:admin123@ds127954.mlab.com:27954/heroku_s1q3q26n';
    mongoose.connect(connectionString, { useNewUrlParser: true });
};