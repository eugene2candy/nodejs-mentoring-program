const usersController = require('../controllers').users;
const groupsController = require('../controllers').groups;
const authenticationController = require('../controllers').authentication;

// eslint-disable-next-line arrow-body-style
const asyncHandler = (fn, serviceMethod) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next))
        .then(console.log(`Service Method: ${serviceMethod} is invoked`))
        .catch(next);
};

module.exports = app => {
    app.get('/api', (req, res) => res.status(200).send({ message: 'Welcome to the Users API!' }));

    app.post('/authenticate', asyncHandler(authenticationController.authenticate, 'authenticationService.login'));
    app.use(authenticationController.checkToken);

    app.post('/user', asyncHandler(usersController.create, 'userService.createUser'));
    app.get('/user', asyncHandler(usersController.list, 'userService.findList'));
    app.get('/user/:id', asyncHandler(usersController.retrieve, 'userService.findOne'));
    app.put('/user/:id', asyncHandler(usersController.update, 'userService.updateUserById'));
    app.delete('/user/:id', asyncHandler(usersController.destroy, 'userService.deleteUserById'));

    app.post('/group', asyncHandler(groupsController.create, 'groupService.createGroup'));
    app.get('/group', asyncHandler(groupsController.list, 'groupService.findList'));
    app.get('/group/:id', asyncHandler(groupsController.retrieve, 'groupService.findOne'));
    app.put('/group/:id', asyncHandler(groupsController.update, 'groupService.updateGroupById'));
    app.delete('/group/:id', asyncHandler(groupsController.destroy, 'groupService.deleteGroupById'));

    app.post('/usergroup', asyncHandler(groupsController.addUser, 'groupService.addUsersToGroup'));
    app.get('/usergroup', asyncHandler(groupsController.userGroupList, 'groupService.findUserGroupList'));
};
