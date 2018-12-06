const tvseriesModel = require('../models/tvseries.model.server');

createTVSeries = tvseries =>
    tvseriesModel.create(tvseries);

truncateTVSeries = () =>
    tvseriesModel.deleteMany();

findAllTVSeries = () =>
    tvseriesModel.find();

findTVSeriesById = tvseriesId =>
    tvseriesModel.findById((parseInt(tvseriesId)));

deleteTVSeries = tvseriesId =>
    tvseriesModel.deleteOne({_id: parseInt(tvseriesId)});

updateTVSeries = (tvseriesId, TVSeries) =>
    tvseriesModel.updateOne(
        {_id: parseInt(tvseriesId)},
        {$set: TVSeries});

module.exports = {
    createTVSeries,
    truncateTVSeries,
    findAllTVSeries,
    findTVSeriesById,
    deleteTVSeries,
    updateTVSeries
}