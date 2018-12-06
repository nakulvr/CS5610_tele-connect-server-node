const commentModel = require('../models/comment.model.server');
const mongoose = require('mongoose');
truncateComments = () =>
    commentModel.deleteMany();

deleteComment = commentId =>
    commentModel.deleteOne({_id: mongoose.Types.ObjectId(commentId)});

createComment = (userId, tvseriesId, comment) => {
    comment.user = mongoose.Types.ObjectId(userId);
    comment.tvseries = parseInt(tvseriesId);
    return commentModel.create(comment);
};

findAllComments = () =>
    commentModel.find()
        .populate('user')
        .populate('tvseries')
        .exec();

findCommentByUser = userId =>
    commentModel.find({
        user: {
            _id: mongoose.Types.ObjectId(userId)
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
                _id: mongoose.Types.ObjectId(userId)
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

updateComment = (commentId, comment) =>
    commentModel.updateOne(
        {_id: mongoose.Types.ObjectId(commentId)},
        {$set: comment});

module.exports = {
    truncateComments,
    createComment,
    findAllComments,
    findCommentByUser,
    findCommentByTVSeries,
    findCommentByUserTVSeries,
    deleteComment,
    updateComment
};