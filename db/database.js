module.exports = () => {
    const mongoose = require('mongoose')
    mongoose.set('useCreateIndex', true);
    const databaseName = 'tele-connect'
    let connectionString = 'mongodb://localhost/';
    connectionString += databaseName
    mongoose.connect(connectionString, { useNewUrlParser: true });
};