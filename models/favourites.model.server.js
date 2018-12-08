const mongoose = require('mongoose');
const favouriteSchema = require('./favourites.schema.server');
const favouriteModel = mongoose.model('FavouritesModel', favouriteSchema);
module.exports = favouriteModel;