const mongoose = require('mongoose');
const user = require('./user.schema.server');
const tvseries = require('./tvseries.schema.server');
module.exports = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    tvseries: [{type: mongoose.Schema.Types.Number, ref: 'TVSeriesModel'}]
}, {collection: 'favourites'});