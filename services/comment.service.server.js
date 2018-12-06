const commentDao = require('../dao/comment.dao.server');
const async = require('async');

module.exports = app => {

    createComment = (req, res) =>
        async.waterfall([
                (callback) => {
                    commentDao.createComment(
                        req.params['userId'],
                        req.params['tvseriesId'],
                        req.body)
                        .then(comment => callback(null, comment))
                }
            ],
            () => {
                findAllComments(req, res);
            });

    findAllComments = (req, res) => {
        commentDao.findAllComments()
            .then(comments => res.json(comments));
    };

    findCommentByTVSeries = (req, res) => {
        commentDao.findCommentByTVSeries(req.params['tvseriesId'])
            .then(comments => res.json(comments));
    };

    findCommentByUser = (req, res) => {
        commentDao.findCommentByUser(req.params['userId'])
            .then(comments => res.json(comments));
    };

    findCommentByUserTVSeries = (req, res) => {
        commentDao.findCommentByUserTVSeries(
            req.params['userId'],
            req.params['tvseriesId'])
            .then(comments => res.json(comments));
    };

    deleteComment = (req, res) => {
        async.waterfall([
                (callback) => {
                    commentDao.deleteComment(req.params['commentId'])
                        .exec(result => callback(null, result))
                }
            ],
            () => {
                findCommentByTVSeries(req, res);
            })
    };

    updateComment = (req, res) => {
        async.waterfall([
                (callback) => {
                    commentDao.updateComment(
                        req.params['commentId'],
                        req.body)
                        .exec(result => callback(null, result))
                }
            ],
            () => {
                findCommentByTVSeries(req, res);
            })
    };

    app.post('/api/user/:userId/tvseries/:tvseriesId/comment', createComment)
    app.get('/api/user/:userId/comment', findCommentByUser);
    app.get('/api/tvseries/:tvseriesId/comment', findCommentByTVSeries);
    app.delete('/api/tvseries/:tvseriesId/comment/:commentId', deleteComment);
    app.put('/api/tvseries/:tvseriesId/comment/:commentId', updateComment);
};