const userDao = require('../dao/user.dao.server');
const async = require('async');
module.exports = app => {
    createUser = (req, res) => {
        async.waterfall(
            [
                (callback) => {
                    userDao.createUser(req.body)
                        .then(result => callback(null, result))
                }
            ],
            () => {
                findAllUsers(req, res)
            }
        )
    };

    findAllUsers = (req, res) => {
        userDao.findAllUsers()
            .then(user => res.json(user))
    };

    findUserById = (req, res) => {
        // console.log(req.params['userId']);
        return userDao.findUserById(req.params['userId'])
            .then(user => res.json(user))
    };

    findUserByUsername = (req, res) => {
        return userDao.findUserByUsername(req.params['username'])
            .then(user => res.json(user));
    };

    findUsernamePassword = (req, res) => {
        return userDao.findUsernamePassword(
            req.body.username,
            req.body.password)
            .then(user => res.json(user));
    };

    findUserAdmin = (req, res) =>
        userDao.findUserAdmin(req.params['userId'])
            .then(user => res.json(user));

    deleteUser = (req, res) =>
        async.waterfall(
            [
                (callback) => {
                    userDao.deleteUser(req.params['userId'])
                        .exec((result) => callback(null, result))
                }
            ],
            () => {
                findAllUsers(req, res)
            }
        )

    updateUser = (req, res) => {
        async.waterfall(
            [
                (callback) => {
                    userDao.updateUser(req.params['userId'], req.body)
                        .exec((result) => callback(null, result))
                }
            ],
            () => {
                findAllUsers(req, res)
            }
        )
    };

    app.post('/api/user', createUser);
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.get('/api/username/:username', findUserByUsername);
    app.get('/api/username/:username/admin', findUserAdmin);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);
    app.post('/api/login', findUsernamePassword)
};