const mongoose = require('mongoose');
const tvseriesSchema = require('./tvseries.schema.server');
const tvseriesModel = mongoose.model('TVSeriesModel', tvseriesSchema);
module.exports = tvseriesModel;