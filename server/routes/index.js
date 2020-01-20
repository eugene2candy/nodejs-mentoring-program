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

    app.post('', usersController.create);
    app.get('/getList', usersController.list);
    app.get('/getOne', usersController.retrieve);
    app.put('', usersController.update);
    app.delete('', usersController.destroy);
};
