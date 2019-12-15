const express = require('express');
const router = express.Router();
const user = require('../controller/user');

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

router.post('/', user.create);

router.get('/user/:id', user.find);

router.get('/user', user.findAll);

router.put('/updatebyid', user.updateById);

router.put('/delete', user.deleteById);

module.exports = router;
