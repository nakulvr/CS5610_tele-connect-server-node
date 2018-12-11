const userModel = require('../models/user.model.server');
const mongoose = require('mongoose');
truncateUsers = () =>
    userModel.deleteMany();

createUser = user =>
    userModel.create(user);

findAllUsers = () =>
    userModel.find();

findUserById = userId =>
    userModel.findById(mongoose.Types.ObjectId(userId));

findUserByUsername = username =>
    userModel.find({username: username});

findUsernamePassword = (username, password) =>
    userModel.find({username: username, password: password});

deleteUser = userId =>
    userModel.deleteOne({_id: mongoose.Types.ObjectId(userId)});

findUserAdmin = userId =>
    userModel.findOne({_id: mongoose.Types.ObjectId(userId), type: 'ADMIN'});

updateUser = (userId, user) => {
  return userModel.updateOne(
    {_id: mongoose.Types.ObjectId(userId)},
    {$set: user})
};

module.exports = {
    truncateUsers,
    createUser,
    findAllUsers,
    findUserById,
    deleteUser,
    updateUser,
    findUserByUsername,
    findUsernamePassword,
    findUserAdmin
};