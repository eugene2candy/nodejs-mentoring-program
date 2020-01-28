const usersController = require('../controllers').users;

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
};
