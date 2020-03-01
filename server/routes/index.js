const jwt = require('jsonwebtoken');
const usersController = require('../controllers').users;
const groupsController = require('../controllers').groups;

const secret = 'nodejsmentoringprogram';

// eslint-disable-next-line arrow-body-style
const asyncHandler = (fn, serviceMethod) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next))
        .then(console.log(`Service Method: ${serviceMethod} is invoked`))
        .catch(next);
};

const checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).send({ success: false, message: 'No token provided' });
    }
    return jwt.verify(token, secret, err => {
        if (err) {
            return res.status(403).send({ success: false, message: 'invalid token' });
        }
        return next();
    });
};

module.exports = app => {
    app.get('/api', (req, res) => res.status(200).send({ message: 'Welcome to the Users API!' }));

    app.post('/authenticate', asyncHandler(usersController.authenticate, 'userService.login'));
    app.post('/user', checkToken, asyncHandler(usersController.create, 'userService.createUser'));
    app.get('/user', checkToken, asyncHandler(usersController.list, 'userService.findList'));
    app.get('/user/:id', checkToken, asyncHandler(usersController.retrieve, 'userService.findOne'));
    app.put('/user/:id', checkToken, asyncHandler(usersController.update, 'userService.updateUserById'));
    app.delete('/user/:id', checkToken, asyncHandler(usersController.destroy, 'userService.deleteUserById'));

    app.post('/group', checkToken, asyncHandler(groupsController.create, 'groupService.createGroup'));
    app.get('/group', checkToken, asyncHandler(groupsController.list, 'groupService.findList'));
    app.get('/group/:id', checkToken, asyncHandler(groupsController.retrieve, 'groupService.findOne'));
    app.put('/group/:id', checkToken, asyncHandler(groupsController.update, 'groupService.updateGroupById'));
    app.delete('/group/:id', checkToken, asyncHandler(groupsController.destroy, 'groupService.deleteGroupById'));

    app.post('/usergroup', checkToken, asyncHandler(groupsController.addUser, 'groupService.addUsersToGroup'));
    app.get('/usergroup', checkToken, asyncHandler(groupsController.userGroupList, 'groupService.findUserGroupList'));
};
