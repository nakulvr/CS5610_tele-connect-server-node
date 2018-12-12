const followModel = require('../models/follow.model.server');
const mongoose = require('mongoose');

createFollower = (userId, followerId) => {
    return findFollow1(userId)
        .then(result => {
            if (result.length === 0) {
                return followModel.create({user: mongoose.Types.ObjectId(userId)})
                    .then(result =>
                        followModel.updateOne({user: mongoose.Types.ObjectId(userId)},
                            {$push: {followers: mongoose.Types.ObjectId(followerId)}}))
            } else {
                return followModel.updateOne({user: mongoose.Types.ObjectId(userId)},
                    {$push: {followers: mongoose.Types.ObjectId(followerId)}})
            }
        })
};

createFollowing = (userId, followingId) => {
    return findFollow1(userId)
        .then(result => {
            if (result.length === 0) {
                return followModel.create({user: mongoose.Types.ObjectId(userId)})
                    .then(result =>
                        followModel.updateOne({user: mongoose.Types.ObjectId(userId)},
                            {$push: {following: mongoose.Types.ObjectId(followingId)}}))
            } else {
                return followModel.updateOne({user: mongoose.Types.ObjectId(userId)},
                    {$push: {following: mongoose.Types.ObjectId(followingId)}})
            }
        })
};

deleteFollower = (userId, followerId) =>
    followModel.updateOne({user: mongoose.Types.ObjectId(userId)},
        {$pull: {followers: mongoose.Types.ObjectId(followerId)}});

deleteFollowing = (userId, followingId) =>
    followModel.updateOne({user: mongoose.Types.ObjectId(userId)},
        {$pull: {following: mongoose.Types.ObjectId(followingId)}});

findFollow1 = userId =>
    followModel.find({user: {_id: mongoose.Types.ObjectId(userId)}})

findFollow = userId =>
    followModel.findOne({user: {_id: mongoose.Types.ObjectId(userId)}})
        .populate('user')
        .populate('following')
        .populate('followers')
        .exec();

findFollower = (userId, followerId) =>
    followModel.find({
        user: {_id: mongoose.Types.ObjectId(userId)},
        follower: {_id: mongoose.Types.ObjectId(followerId)}
    })
        .populate('user')
        .populate('following')
        .populate('followers')
        .exec();

findFollowing = (userId, followingId) =>
    followModel.find({
        user: {_id: mongoose.Types.ObjectId(userId)},
        following: {_id: mongoose.Types.ObjectId(followingId)}
    })
        .populate('user')
        .populate('following')
        .populate('followers')
        .exec();

module.exports = {
    createFollower,
    createFollowing,
    deleteFollower,
    deleteFollowing,
    findFollower,
    findFollowing,
    findFollow
};