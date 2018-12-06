const mongoose = require('mongoose');
const user = require('./user.schema.server');
const tvseries = require('./tvseries.schema.server');
module.exports = module.Schema({
    private: {type: Boolean, default: false},
    rating: {type: Number, default: 5},
    comment: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    tvseries: {type: mongoose.Schema.Types.Number, ref: 'TVSeriesModel'}
}, {collection: 'comments'});