const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    type: {type: String, enum: ['FAN', 'ADMIN']}
}, {collection: 'user'});
module.exports = userSchema;