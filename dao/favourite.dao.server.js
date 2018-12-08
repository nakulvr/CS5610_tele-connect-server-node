const favouriteModel = require('../models/favourites.model.server');
const mongoose = require('mongoose');

createFavourite = (userId, tvseriesId) =>
    // favouriteModel.create({user: userId, $push:{tvseries: tvseriesId}});
{
    return findFavouriteByUser(userId)
        .then(result => {
            if (result.length === 0) {
                // console.log(result);
                return favouriteModel.create({user: mongoose.Types.ObjectId(userId)})
                    .then(result =>
                        favouriteModel.updateOne({user: {_id: mongoose.Types.ObjectId(userId)}},
                            {$push: {tvseries: parseInt(tvseriesId)}}))
            } else {

                return favouriteModel.updateOne({user: {_id: mongoose.Types.ObjectId(userId)}},
                    {$push: {tvseries: parseInt(tvseriesId)}})
                // .then(result => console.log(result))
            }
        });
    // return {result: true}
};

findAllFavourite = () =>
    favouriteModel.find({})
        .populate('user')
        .populate('tvseries')
        .exec();

findFavouriteByUser = (userId) => {
    return favouriteModel.find({user: {_id: mongoose.Types.ObjectId(userId)}})
        .populate('user')
        .populate('tvseries')
        .exec();
};

findFavouriteByUserTV = (userId, tvseriesId) =>
    favouriteModel.find({
        user: {_id: mongoose.Types.ObjectId(userId)},
        tvseries: {_id: parseInt(tvseriesId)}
    })
        .populate('user')
        .populate('tvseries')
        .exec();

deleteFavourite = (userId, tvseriesId) =>
    favouriteModel.updateOne({
            user: {_id: mongoose.Types.ObjectId(userId)}
        },
        {$pull: {tvseries: parseInt(tvseriesId)}})
        .populate('user')
        .populate('tvseries')
        .exec();

module.exports = {
    createFavourite,
    findAllFavourite,
    findFavouriteByUser,
    findFavouriteByUserTV,
    deleteFavourite
};
