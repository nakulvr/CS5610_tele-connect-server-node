const userModel = require('../models/user.model.server');

truncateUsers = () =>
    userModel.deleteMany();

createUser = user =>
    userModel.create(user);

findAllUsers = () =>
    userModel.find();

findUserById = userId =>
    userModel.findOne({_id: parseInt(userId)});

deleteUser = userId =>
    userModel.deleteOne({_id: parseInt(userId)});

updateUser = (userId, user) => {
  userModel.updateOne(
    {_id: parseInt(userId)},
    {$set: user}
  )
};

module.exports = {
    truncateUsers,
    createUser,
    findAllUsers,
    findUserById,
    deleteUser,
    updateUser
};