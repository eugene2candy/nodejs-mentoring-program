const usersController = require('../controllers').users;
const groupsController = require('../controllers').groups;

module.exports = app => {
    app.get(
        '/api',
        (req, res) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            res.status(200).send({
                message: 'Welcome to the Users API!'
            })
        // eslint-disable-next-line function-paren-newline
    );

    app.post('/user', usersController.create);
    app.get('/user', usersController.list);
    app.get('/user/:id', usersController.retrieve);
    app.put('/user/:id', usersController.update);
    app.delete('/user/:id', usersController.destroy);

    app.post('/group', groupsController.create);
    app.get('/group', groupsController.list);
    app.get('/group/:id', groupsController.retrieve);
    app.put('/group/:id', groupsController.update);
    app.delete('/group/:id', groupsController.destroy);

    app.post('/usergroup', groupsController.addUser);
    app.get('/usergroup', groupsController.userGroupList);
};
