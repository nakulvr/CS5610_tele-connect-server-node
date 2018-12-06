const commentModel = require('../models/comment.model.server');

truncateComments = () =>
    commentModel.deleteMany()

createComment = (userId, movieId, comment) => {
    comment.user = parseInt(userId);
    comment.tvseries = parseInt(movieId);
    return commentModel.create(comment);
};

findAllComments = () =>
    commentModel.find()
        .populate('user')
        .populate('tvseries')
        .exec();

findCommentByUser = userId =>
    commentModel.find({
        student: {
            _id: userId
        }
    })
        .populate('user')
        .populate('tvseries')
        .exec();

findCommentByTVSeries = tvseriesId =>
    commentModel.find({
        tvseries: {
            _id: tvseriesId
        }
    })
        .populate('user')
        .populate('tvseries')
        .exec();

findCommentByUserTVSeries = (userId, tvseriesId) =>
    commentModel.find({
        $and: [{
            user: {
                _id: parseInt(userId)
            }
        }, {
            tvseries: {
                _id: parseInt(tvseriesId)
            }
        }
        ]
    })
        .populate('user')
        .populate('tvseries')
        .exec();

module.exports = {
    truncateComments,
    createComment,
    findAllComments,
    findCommentByUser,
    findCommentByTVSeries,
    findCommentByUserTVSeries
};