module.exports = () => {
    const mongoose = require('mongoose')
    const databaseName = 'tele-connect'
    let connectionString = 'mongodb://localhost/';
    connectionString += databaseName
    mongoose.connect(connectionString, { useNewUrlParser: true });
};