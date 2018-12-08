const followDao = require('../dao/follow.dao.server');
const async = require('async');

// TODO: need to call createFollow and Following for single follow call,
//  change below logic call both and create single response upon changing both arrays of both users

module.exports = app => {
    createFollower = (req, res) =>
        async.waterfall([
            (callback) => {
                followDao.findFollower(req.params['userId'], req.params['followerId'])
                    .then(result => {
                        if(result.length === 0) {
                            followDao.createFollower(
                                req.params['userId'],
                                req.params['followerId'])
                                .then(result => callback(null, result))
                        }
                        else {
                            callback(null, 'done')
                        }
                    })
            }
        ], () => {
           findFollow(req, res)
        });

    createFollowing = (req, res) =>
        async.waterfall([
            (callback) => {
                followDao.findFollowing(req.params['userId'], req.params['followingId'])
                    .then(result => {
                        if(result.length === 0) {
                            followDao.createFollowing(
                                req.params['userId'],
                                req.params['followingId'])
                                .then(result => callback(null, result))
                        }
                        else {
                            callback(null, 'done')
                        }
                    })
            }
        ], () => {
            findFollow(req, res)
        });

    findFollow = (req, res) =>
        followDao.findFollow(req.params['userId'])
            .then(result => res.json(result))

    app.get('/api/user/:userId/follower/:followerId/follow', createFollower)
};