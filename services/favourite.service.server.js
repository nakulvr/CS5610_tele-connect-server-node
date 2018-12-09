const favouriteDao = require('../dao/favourite.dao.server');
const async = require('async');

module.exports = app => {
    createFavourite = (req, res) =>
        async.waterfall([
                (callback) => {
                    favouriteDao.findFavouriteByUserTV(
                        req.params['userId'],
                        req.params['tvseriesId'])
                        .then(result => {
                            if (result.length === 0) {
                                favouriteDao.createFavourite(
                                    req.params['userId'],
                                    req.params['tvseriesId'])
                                    .then(callback(null, result))
                            }
                            else {
                                callback(null, 'done');
                            }
                        });
                }
            ],
            () => {
                findFavouriteByUser(req, res)
            });

    findAllFavourites = (req, res) =>
        favouriteDao.findAllFavourite()
            .then(favourite => res.json(favourite));

    findFavouriteByUserTV = (req, res) =>
        favouriteDao.findFavouriteByUserTV(req.params['userId'], req.params['tvseriesId'])
            .then(fav => res.json(fav));

    findFavouriteByUser = (req, res) =>
        favouriteDao.findFavouriteByUser(req.params['userId'])
            .then(fav => res.json(fav));

    deleteFavourite = (req, res) =>
        async.waterfall([
            (callback) => {
                favouriteDao.deleteFavourite(req.params['userId'], req.params['tvseriesId'])
                    .then(result => callback(null ,result))
            }
        ], () => {
            favouriteDao.findFavouriteByUser(req.params['userId'])
                .then(fav => res.json(fav));
        });

    app.get('/api/user/:userId/tvseries/:tvseriesId/favourite', createFavourite);
    app.get('/api/tvseries/:tvseriesId/user/:userId/favourite', findFavouriteByUserTV);
    app.get('/api/user/:userId/favourite', findFavouriteByUser);
    app.delete('/api/user/:userId/tvseries/:tvseriesId/favourite', deleteFavourite);
};