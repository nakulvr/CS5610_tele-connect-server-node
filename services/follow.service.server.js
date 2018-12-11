const followDao = require('../dao/follow.dao.server');
const async = require('async');

// TODO: need to call createFollow and Following for single follow call,
//  change below logic call both and create single response upon changing both arrays of both users

module.exports = app => {
    createFollower = (req, res) =>
        async.waterfall([
            (callback) => {
                followDao.findFollower(req.params['followerId'], req.params['userId'])
                    .then(result => {
                        if(result.length === 0) {
                            followDao.createFollower(
                                req.params['followerId'],
                                req.params['userId'])
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

    userUnfollowing = (req, res) =>
        async.waterfall([
            (callback) => {
                followDao.deleteFollowing(
                    req.params['userId'],
                    req.params['followingId'])
                    .then(result => callback(null, result))
            }
        ], () => {
           findFollow(req, res)
        });

    userUnfollower = (req, res) =>
        async.waterfall([
            (callback) => {
            followDao.deleteFollower(
                req.params['followerId'],
                req.params['userId'])
                .then(result => callback(null ,result))
            }
        ], () => {
            findFollow(req, res)
        });

    findFollow = (req, res) =>
        followDao.findFollow(req.params['userId'])
            .then(result => res.json(result));

    findFollowing = (req, res) =>
        followDao.findFollowing(req.params['userId'],
            req.params['followingId'])
            .then(result => res.json(result));

    app.get('/api/user/:userId/following/:followingId/follow', createFollowing);
    app.get('/api/user/:userId/follower/:followerId/follow', createFollower);
    app.get('/api/user/:userId/following/:followingId/unfollow', userUnfollowing);
    app.get('/api/user/:userId/follower/:followerId/unfollow', userUnfollower);
    app.get('/api/user/:userId/following/:followingId', findFollowing);
    app.get('/api/user/:userId/follow', findFollow);
};