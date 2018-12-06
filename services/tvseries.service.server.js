const tvseriesDao = require('../dao/tvseries.dao.server');
const async = require('async');
module.exports = app => {
    createTVSeries = (req, res) => {
        async.waterfall(
            [
                (callback) => {
                    tvseriesDao.createTVSeries(req.body)
                        .then(result => callback(null, result))
                }
            ],
            () => {
                findAllTVSeries(req, res)
            }
        )
    };

    findAllTVSeries = (req, res) =>
        tvseriesDao.findAllTVSeries()
            .then(tvseries => res.json(tvseries));

    findTVSeriesById = (req, res) =>
        tvseriesDao.findTVSeriesById(req.params['tvseriesId'])
            .then(tvseries => res.json(tvseries));

    deleteTVSeries = (req, res) =>
        async.waterfall(
            [
                (callback) => {
                    tvseriesDao.deleteTVSeries(req.params['tvseriesId'])
                        .exec(result => callback(null ,result))
                }
            ],
            () => {
                findAllTVSeries(req, res);
            }
        );

    app.post('/api/tvseries', createTVSeries);
    app.get('/api/tvseries', findAllTVSeries);
    app.get('/api/tvseries/:tvseriesId', findTVSeriesById);
    app.delete('/api/tvseries/:tvseriesId', deleteTVSeries);
};
