const mongoose = require('mongoose');
module.exports = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}]
}, {collection: 'follow'});