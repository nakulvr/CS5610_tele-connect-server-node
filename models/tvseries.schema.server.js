const mongoose = require('mongoose');
const tvseriesSchema = mongoose.Schema({
    _id: {type: Number, required: true},
    name: String,
    vote_average: Number
}, {collection: 'tvseries'});
module.exports = tvseriesSchema;